package com.example.trymatch.travel;

import org.json.simple.parser.ParseException;

import java.util.ArrayList;
import java.util.HashMap;

public interface TravelService {

    ArrayList<TravelDTO> callTravelData(String search, String eventDate, String local) throws ParseException;
}
