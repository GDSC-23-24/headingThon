package com.yaedora.Member.Service;

import com.yaedora.Member.Entity.Member;
import com.yaedora.Member.Entity.Review;
import com.yaedora.Member.Repository.MemberRepository;
import com.yaedora.Member.Repository.ReviewRepository;
import com.yaedora.Member.dto.ReviewDto;
import com.yaedora.Member.dto.ReviewRequestDto;
import com.yaedora.Store.entity.Store;
import com.yaedora.Store.repository.StoreRepository;
import jakarta.persistence.Table;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReviewService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    public List<ReviewDto> getReview(Long storeId){
        List<ReviewDto> reviewDtos = reviewRepository.findBystoreId(storeId).stream().map(ReviewDto::from).toList();
        return reviewDtos;
    }

    public void insertReview(ReviewRequestDto reviewRequestDto){
        Member member = memberRepository.findById(reviewRequestDto.getMemberId()).get();
        // 원래는 있는지 없는지 확인해야 하는데 그냥 하겠음.

        Store store = storeRepository.findStoreById(reviewRequestDto.getStoreId());
        // 원래는 있는지 없는지 확인해야 하는데 그냥 하겠음.

        Review review = Review.builder()
                .text(reviewRequestDto.getContent())
                .member(member)
                .store(store)
                .build();

        reviewRepository.save(review);

    }

    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId).get();
        reviewRepository.delete(review);
    }

    public void updateReview(ReviewRequestDto reviewRequestDto){
        Review review = reviewRepository.findById(reviewRequestDto.getId()).get();

        review.setText(reviewRequestDto.getContent());

    }
}
