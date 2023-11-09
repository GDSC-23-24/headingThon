from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
import numpy as np
import requests

#서버에서 데이터 받아오기
url = " http://58.231.37.42:25565/"
rating_json = requests.get(f"{url}store/rating")
good_json = requests.get(f"{url}store/likes/count?stor_id")

# 사용자 평가 데에티 전처리
rating_dic = list(rating_json.json().items())[0][1]
member_id, rating_list, store_id = [], [], []
for item in rating_dic:
    member_id.append(item['member_id'])
    rating_list.append(item['rating'])
    store_id.append(item['store']['id'])

df = pd.DataFrame({
    'member_id': member_id,
    'rating': rating_list,
    'store_id': store_id
})

#좋아요 데이터 전처리
good_dic = list(good_json.json().items())[0][1]
likesCount = [item['likesCount'] for item in good_dic]

# member_id를 인덱스로, store_id를 컬럼으로, rating을 값으로 사용하여 피봇 테이블 생성
rating_matrix = df.pivot_table(index='member_id', columns='store_id', values='rating')


matrix_dummy = rating_matrix.copy().fillna(0)
user_similarity = cosine_similarity(matrix_dummy, matrix_dummy)
user_similarity = pd.DataFrame(user_similarity, index=rating_matrix.index, columns=rating_matrix.index)

rating_mean = rating_matrix.mean(axis=1)
rating_bias = (rating_matrix.T - rating_mean).T

def CF_knn_bias(user_id, store_id,neighbor_size=5):
    good = likesCount[store_id]
    if store_id in rating_bias:
        # 현 user와 다른 사용자 간의 유사도 가져오기
        sim_scores = user_similarity[user_id].copy()
        # 현 가게의 평점편차 가져오기
        store_ratings = rating_bias[store_id].copy()
        # 현 가게에 대한 rating이 없는 사용자 삭제
        none_rating_idx = store_ratings[store_ratings.isnull()].index
        store_ratings = store_ratings.drop(none_rating_idx)
        sim_scores = sim_scores.drop(none_rating_idx)
##### (2) Neighbor size가 지정되지 않은 경우  
          
        if neighbor_size == 0:
            # 편차로 예측값(편차 예측값) 계산
            prediction = np.dot(sim_scores, store_ratings) / sim_scores.sum()
            # 편차 예측값에 현 사용자의 평균 더하기
            prediction = prediction + rating_mean[user_id]
##### (3) Neighbor size가 지정된 경우
        else:
            # 해당 영화를 평가한 사용자가 최소 2명이 되는 경우에만 계산            
            if len(sim_scores) > 1:
                # 지정된 neighbor size 값과 해당 영화를 평가한 총사용자 수 중 작은 것으로 결정
                neighbor_size = min(neighbor_size, len(sim_scores))
                # array로 바꾸기 (argsort를 사용하기 위함)
                sim_scores = np.array(sim_scores)
                store_ratings = np.array(store_ratings)
                # 유사도를 순서대로 정렬
                user_idx = np.argsort(sim_scores)
                # 유사도와 rating을 neighbor size만큼 받기
                sim_scores = sim_scores[user_idx][-neighbor_size:]
                store_ratings = store_ratings[user_idx][-neighbor_size:]
                # 편차로 예측치 계산
                prediction = np.dot(sim_scores, store_ratings) / sim_scores.sum()
                # 예측값에 현 사용자의 평균 더하기
                prediction = prediction + rating_mean[user_id]
            else:
                prediction = rating_mean[user_id]
    else:
        prediction=0
    prediction=prediction*0.7 + good*0.3 
    return prediction

userid= 1
store_list = 25
ratingid={}
store_result=[]

for store_id in range(store_list):
    ratingid[store_id]=CF_knn_bias(userid,store_id,5)
ratingid=sorted(ratingid.items(),key=lambda x:x[1],reverse=True)
for i in ratingid:
    store_result.append(i[0])

print(store_result[0:5])