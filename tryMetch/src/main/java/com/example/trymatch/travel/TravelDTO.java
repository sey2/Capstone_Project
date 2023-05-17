package com.example.trymatch.travel;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class TravelDTO {
    String city;
    String spot;
    String img;
    Double mapX;
    Double mapY;

}