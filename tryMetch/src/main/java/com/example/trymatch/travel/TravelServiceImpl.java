package com.example.trymatch.travel;

import org.json.simple.JSONArray;
import lombok.extern.log4j.Log4j2;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;

@Service
@Log4j2
public class TravelServiceImpl implements TravelService{

    @Override
    public ArrayList<TravelDTO> callTravelData(String search, String eventDate, String local) throws ParseException {

        HashMap<String, String> params = new HashMap<>();
        params.put("ServiceKey", "key");
        params.put("numOfRows", "10");
        params.put("pageNo", "1");
        params.put("MobileOS", "ETC");
        params.put("MobileApp", "AppTest");
        params.put("arrange", "P");
        params.put("listYN", "Y");
        params.put("areaCode", local); //1 서울 //39 제주도 //5 광주 // 6 부산
        params.put("_type", "json");

        String url = "http://api.visitkorea.or.kr/openapi/service/rest/KorService/" + search;

        url = addParams(url, params);

        if(!eventDate.equals(""))
            url += "&eventStartDate=" + eventDate;


        RestTemplate restTemplate = new RestTemplate();
        String jsonString = restTemplate.getForObject(url, String.class);
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(jsonString);

        JSONObject response = (JSONObject) jsonObject.get("response");
        JSONObject body = (JSONObject) response.get("body");
        JSONObject items = (JSONObject) body.get("items");
        JSONArray itemArray = (JSONArray) items.get("item");

        ArrayList<TravelDTO> arItem = new ArrayList<>();

        for(Object o : itemArray){
            JSONObject item = (JSONObject) o;

            if(item.get("firstimage").equals("")) continue;

            TravelDTO travel = TravelDTO.builder()
                    .spot(parseAddress((String) item.get("addr1")))
                    .city(parseTitle((String) item.get("title")))
                    .img((String) item.get("firstimage"))
                    .mapX(Double.parseDouble((String)item.get("mapx")))
                    .mapY(Double.parseDouble((String)item.get("mapy")))
                    .build();

            arItem.add(travel);

        }

        return arItem;

    }

    private String addParams(String url, HashMap<String, String> mapParam) {
        StringBuilder stringBuilder = new StringBuilder(url + "?");

        if (mapParam != null) {
            for (String key : mapParam.keySet()) {
                stringBuilder.append(key + "=");
                stringBuilder.append(mapParam.get(key) + "&");
            }
        }
        return stringBuilder.toString();
    }

    private String parseAddress(String addr){
        String str[] = addr.split(" ");
        return (str.length > 1) ? str[0] + str[1]: addr;
    }

    private String parseTitle(String title){
        return (title.length() >= 12 ) ? title.substring(0, 12) + ".." : title;
    }

    private String convertLocalNum (String local) {

        if (local.equals("제주") || local.equals("제주도")) return "39";

        String arr1[] = {"서울", "인천", "대전", "대구", "광주", "부산", "울산", "세종"};

        String arr2[] = {"서울특별시", "인천광역시", "대전광역시", "대구광역시", "광주광역시", "부산광역시", "울산광역시", "세종특별자치시"};

        for (int i = 0; i < arr1.length; i++) {
            if (local.equals(arr1[i]) || local.equals(arr2[i])) {
                return String.valueOf(i + 1);
            }
        }

        return "-1";
    }
}
