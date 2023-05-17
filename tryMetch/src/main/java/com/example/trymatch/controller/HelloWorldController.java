package com.example.trymatch.controller;


import com.example.trymatch.travel.TravelDTO;
import com.example.trymatch.travel.TravelService;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class HelloWorldController {

    private final TravelService travelService;

    @GetMapping("/api/hello")
    public String test() {
        return "S";
    }

    @GetMapping("/api/map")
    public ArrayList<TravelDTO> getTravelData() throws ParseException {
        ArrayList<TravelDTO> list = travelService.callTravelData("areaBasedList", "","1");

        for(TravelDTO dto : list)
            System.out.println("city:" + dto.getCity() + "\nspot: " + dto.getSpot()
            +"\n img: " + dto.getCity() + "\n mapX:" + dto.getMapX() + "\n mapY: " + dto.getMapY());

        return travelService.callTravelData("areaBasedList", "","1");
    }
}