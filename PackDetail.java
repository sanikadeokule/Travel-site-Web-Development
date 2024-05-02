package com.travelsite.travelsite;

import java.util.List;
import java.util.Map;

public class PackDetail {
    private int id;
    private String packageName;
    private int packageDuration;

    private Map<String,List<String>> amenities ;
    private Map<String,List<String>> itinerary;
    private Map<String,List<String>>  cities;
    private String description;
    private int stars;
    private String validFrom;
    private String validTo;
    private Map<String,List<String>> packageType;
    private String imageURL;


    public PackDetail(int id, String packageName, int packageDuration, Map<String,List<String>>  amenities, Map<String,List<String>>  itinerary ,Map<String,List<String>>  cities, String description, int stars, String validFrom, String validTo, Map<String,List<String>> packageType,String imageURL  ) {
        this.id = id;
        this.packageName = packageName;
        this.packageDuration = packageDuration;
        this.amenities = amenities;
        this.itinerary = itinerary;
        this.cities = cities;
        this.description = description;
        this.validFrom = validFrom;
        this.validTo=validTo;
        this.stars=stars;
        this.packageType=packageType;
        this.imageURL = imageURL;

    }

    public int getId() {
        return id;
    }

    public String getPackageName() {
        return packageName;
    }

    public int getPackageDuration() {
        return packageDuration;
    }

    public Map<String, List<String>> getAmenities() {
        return amenities;
    }

    public Map<String, List<String>> getItinerary() {
        return itinerary;
    }

    public Map<String, List<String>> getCities() {
        return cities;
    }

    public String getDescription() {
        return description;
    }

    public Map<String,List<String>> getPackageType() {
        return packageType;
    }


    public int getStars() {
        return stars;
    }

    public String getValidFrom() {
        return validFrom;
    }

    public String getValidTo() {
        return validTo;
    }

    public String getImageURL() {
        return imageURL;
    }
}
