package com.yaedora.Member.Controller;


import com.yaedora.Member.Service.ReviewService;
import com.yaedora.Member.dto.ReviewRequestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping("/addReview")
    public ResponseEntity<?> addReview(@RequestBody ReviewRequestDto reviewRequestDto){
        reviewService.insertReview(reviewRequestDto);
        // 간단하게 항상 데이터는 valid하다고 가정
        return ResponseEntity.ok(true);
    }

    @PostMapping("/deleteReview")
    public ResponseEntity<?> deleteReview(@RequestBody ReviewRequestDto reviewRequestDto){
        reviewService.deleteReview(reviewRequestDto.getId());
        // 간단하게 항상 데이터는 valid하다고 가정
        return ResponseEntity.ok(true);
    }

    @PostMapping("/updateReview")
    public ResponseEntity<?> updateReview(@RequestBody ReviewRequestDto reviewRequestDto){
        reviewService.updateReview(reviewRequestDto);
        // 간단하게 항상 데이터는 valid하다고 가정
        return ResponseEntity.ok(true);
    }

}
