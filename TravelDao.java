package com.travelsite.travelsite;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Repository;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
@Repository
public class TravelDao {
    private final DataSource dataSource;
    Map<Integer, List<String>> detailsMap = new HashMap<>();
    Map<String, List<String>> citiesMap = new HashMap<>();
    //pid+@@@+cityName
    Map<String, List<String>> itinerariesMap = new HashMap<>();
    //key=pid+day
    Map<String, List<String>> packageTypesMap = new HashMap<>();
    //key=pid+packageType
    Map<String, List<String>> amenitiesMap = new HashMap<>();
    //key=pid+packageType+amenity
    Map<Integer, List<URL>> imagesMap = new HashMap<>();
    //key=pid
    public TravelDao(DataSource dataSource) {
        this.dataSource = dataSource;
        executeQuery();

    }

    public void executeQuery() {
        String sql = "SELECT * FROM public.\"Packages\"";
        try (Connection connection = dataSource.getConnection();
             Statement statement = connection.createStatement();
             ResultSet rs = statement.executeQuery(sql)) {

            while (rs.next()) {
                int id = rs.getInt("Package_pid");
                String name = rs.getString("Package_name");
                String des = rs.getString("Description");
                int dur = rs.getInt("Duration");
                int stars = rs.getInt("Stars");
                String vf = rs.getString("valid_from");
                String vt = rs.getString("valid_to");

                //Create ArrayList
                List<String> packageDetails = new ArrayList<>();

                packageDetails.add(name);
                packageDetails.add(des);
                packageDetails.add(String.valueOf(dur));
                packageDetails.add(String.valueOf(stars));
                packageDetails.add(vf);
                packageDetails.add(vt);

                //store details
                detailsMap.put(id, packageDetails);

                System.out.println(detailsMap);
            }

            String sql1 = "SELECT * FROM public.\"Cities\"";
            ResultSet rs1 = statement.executeQuery(sql1);

            while (rs1.next()) {
                int id = rs1.getInt("Package_pid");
                String city = rs1.getString("City");
                int no_of_days = rs1.getInt("No_Of_Days");

                List<String> citiesList = new ArrayList<>();
                citiesList.add(city);
                citiesList.add(String.valueOf(no_of_days));

                //creating key
                String concat1 = String.valueOf(id).concat("@@@");
                String key_city = concat1.concat(city);

                //store details
                citiesMap.put(key_city, citiesList);
            }

            String sql2 = "SELECT * FROM public.\"Itineraries\"";
            ResultSet rs2 = statement.executeQuery(sql2);

            while (rs2.next()) {
                int id = rs2.getInt("Package_pid");
                String day = rs2.getString("Day");
                String description = rs2.getString("Description");

                List<String> itinerariesList = new ArrayList<>();
                itinerariesList.add(day);
                itinerariesList.add(description);

                //creating key
                String key_iti = String.valueOf(id).concat(day);

                //store details
                itinerariesMap.put(key_iti, itinerariesList);

            }

            String sql3 = "SELECT * FROM public.\"Package_Type\"";
            ResultSet rs3 = statement.executeQuery(sql3);

            while (rs3.next()) {
                int id = rs3.getInt("Package_pid");
                String packageType = rs3.getString("Package_Type");
                int cost = rs3.getInt("Cost");
                String descrip = rs3.getString("Description");

                List<String> packageTypeList = new ArrayList<>();
                packageTypeList.add(packageType);
                packageTypeList.add(String.valueOf(cost));
                packageTypeList.add(descrip);

                //creating key
                String key_pt = String.valueOf(id).concat(packageType);

                //store details
                packageTypesMap.put(key_pt, packageTypeList);
            }

            String sql4 = "SELECT * FROM public.\"Amenities\"";
            ResultSet rs4 = statement.executeQuery(sql4);

            while (rs4.next()) {
                int id = rs4.getInt("Package_pid");
                String packageType = rs4.getString("Package_Type");
                String a = rs4.getString("Amenities");

                List<String> amenitiesList = new ArrayList<>();
                amenitiesList.add(a);

                //creating key
                String c = String.valueOf(id).concat(packageType);
                String key_a = c.concat(a);

                //store values
                amenitiesMap.put(key_a, amenitiesList);
            }

            String sql5 = "SELECT * FROM public.\"Images\"";
            ResultSet rs5 = statement.executeQuery(sql5);

            while (rs5.next()) {
                int id = rs5.getInt("Package_pid");
                String image = rs5.getString("Image");

                // Convert string URL to URL object
                URL imageUrl = new URL(image);

                List<URL> imagesURL = new ArrayList<>();
                imagesURL.add(imageUrl);

                //store details
                imagesMap.put(id, imagesURL);

            }
        }
        catch(SQLException e){
            e.printStackTrace();
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
    }

    public static JsonArray search(String city, int packageId, int dur, String date, int noOfPpl,
                                   Map<Integer, List<String>> detailsMap,
                                   Map<String, List<String>> citiesMap,
                                   Map<String, List<String>> itinerariesMap,
                                   Map<String, List<String>> packageTypesMap,
                                   Map<String, List<String>> amenitiesMap,
                                   Map<Integer, List<URL>> imagesMap) {

        JsonArray jsonArray = new JsonArray();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date_new = LocalDate.parse(date, formatter);

        // Flag
        boolean found = false;

        // Check if packageId is provided
        if (packageId != 0) {
            // Iterate over the detailsMap to find the package with the given packageId
            for (Map.Entry<Integer, List<String>> entry : detailsMap.entrySet()) {
                int id = entry.getKey();
                List<String> details = entry.getValue();
                // Check if the current package matches the given packageId
                if (id == packageId) {
                    // Create JSON object for the package
                    JsonObject packageJson = createPackageJsonObject(id, details, citiesMap, itinerariesMap, packageTypesMap, amenitiesMap, imagesMap);
                    jsonArray.add(packageJson);
                    found = true;
                    break; // Stop searching once a match is found
                }
            }
        } else {
            // No packageId provided, so we'll search by city and duration
            for (Map.Entry<String, List<String>> cityEntry : citiesMap.entrySet()) {
                List<String> cities = cityEntry.getValue();
                // Check if the city matches the provided city
                if (cities.contains(city)) {
                    String packageIdStr = cityEntry.getKey().split("@@@")[0];
                    int packageIdFromCity = Integer.parseInt(packageIdStr);
                    List<String> packageDetails = detailsMap.get(packageIdFromCity);
                    // Check if the package duration matches the provided duration
                    if (packageDetails != null && Integer.parseInt(packageDetails.get(2)) >= dur) {
                        // Check if the date is within the package's validity period
                        LocalDate validFrom = LocalDate.parse(packageDetails.get(4), formatter);
                        LocalDate validTo = LocalDate.parse(packageDetails.get(5), formatter);
                        if (date_new.isAfter(validFrom) && date_new.isBefore(validTo)) {
                            // Create JSON object for the package
                            JsonObject packageJson = createPackageJsonObject(packageIdFromCity, packageDetails, citiesMap, itinerariesMap, packageTypesMap, amenitiesMap, imagesMap);
                            jsonArray.add(packageJson);
                            found = true;
                        }
                    }
                }
            }
        }

        if (!found) {
            // No packages found matching the search criteria
            System.out.println("No packages found matching the search criteria.");
        }

        return jsonArray;
    }

    // Helper method to create JSON object for a package
    private static JsonObject createPackageJsonObject(int packageId, List<String> details,
                                                      Map<String, List<String>> citiesMap,
                                                      Map<String, List<String>> itinerariesMap,
                                                      Map<String, List<String>> packageTypesMap,
                                                      Map<String, List<String>> amenitiesMap,
                                                      Map<Integer, List<URL>> imagesMap) {
        JsonObject packageJson = new JsonObject();
        packageJson.addProperty("PackageId", packageId);
        packageJson.addProperty("PackageName", details.get(0));
        packageJson.addProperty("Description", details.get(1));
        packageJson.addProperty("Duration", details.get(2));
        packageJson.addProperty("Stars", details.get(3));
        packageJson.addProperty("ValidFrom", details.get(4));
        packageJson.addProperty("ValidTo", details.get(5));

        // Get images for this package
        JsonArray imagesArray = new JsonArray();
        List<URL> images = imagesMap.get(packageId);
        if (images != null) {
            for (URL imageUrl : images) {
                JsonObject imageJson = new JsonObject();
                imageJson.addProperty("ImageUrl", imageUrl.toString());
                imagesArray.add(imageJson);
            }
        }
        packageJson.add("Image", imagesArray);

        // Get cities for this package
        JsonArray citiesArray = new JsonArray();
        for (Map.Entry<String, List<String>> cityEntry : citiesMap.entrySet()) {
            if (cityEntry.getKey().startsWith(Integer.toString(packageId))) {
                JsonObject cityJson = new JsonObject();
                cityJson.addProperty("City", cityEntry.getValue().get(0));
                cityJson.addProperty("NoOfDays", cityEntry.getValue().get(1));
                citiesArray.add(cityJson);
            }
        }
        packageJson.add("Cities", citiesArray);

        // Get itineraries for this package
        JsonArray itinerariesArray = new JsonArray();
        for (Map.Entry<String, List<String>> itiEntry : itinerariesMap.entrySet()) {
            if (itiEntry.getKey().startsWith(Integer.toString(packageId))) {
                JsonObject itineraryJson = new JsonObject();
                itineraryJson.addProperty("Day", itiEntry.getValue().get(0));
                itineraryJson.addProperty("Description", itiEntry.getValue().get(1));
                itinerariesArray.add(itineraryJson);
            }
        }
        packageJson.add("Itineraries", itinerariesArray);

        // Get package types for this package
        JsonArray packageTypesArray = new JsonArray();
        for (Map.Entry<String, List<String>> typeEntry : packageTypesMap.entrySet()) {
            if (typeEntry.getKey().startsWith(Integer.toString(packageId))) {
                JsonObject packageTypeJson = new JsonObject();
                List<String> packageType = typeEntry.getValue();
                packageTypeJson.addProperty("PackageType", packageType.get(0));
                packageTypeJson.addProperty("Cost", packageType.get(1));
                packageTypeJson.addProperty("PackageTypeDescription", packageType.get(2));

                // Get amenities for this package
                JsonArray amenitiesArray = new JsonArray();
                for (Map.Entry<String, List<String>> amenityEntry : amenitiesMap.entrySet()) {
                    if (amenityEntry.getKey().contains(Integer.toString(packageId)) && amenityEntry.getKey().contains(packageType.get(0))) {
                        JsonObject amenityJson = new JsonObject();
                        amenityJson.addProperty("Amenity", amenityEntry.getValue().get(0));
                        amenitiesArray.add(amenityJson);
                    }
                }
                packageTypeJson.add("Amenities", amenitiesArray);
                packageTypesArray.add(packageTypeJson);
            }
        }
        packageJson.add("PackageTypes", packageTypesArray);


        return packageJson;
    }
    public String getSearchData(){
        Gson gson = new Gson();
        JsonElement result1 = search("Manali", 0, 0, "2024-10-01", 4, detailsMap, citiesMap, itinerariesMap, packageTypesMap, amenitiesMap, imagesMap);
        // Convert the result to JSON string
        String jsonString1 = gson.toJson(result1);
        // Print or further process the JSON string
        System.out.println(jsonString1);
        return jsonString1;
    }

    public List<PackageInfo> getPackageDetails(){
        List<PackageInfo> packageInfo = new ArrayList<>();
        for ( int id : detailsMap.keySet() ){
            String packageName = detailsMap.get(id).get(0);
            String imageURL = imagesMap.get(id).get(0).toString();
            String description=detailsMap.get(id).get(1);
            PackageInfo packageInfo1 = new PackageInfo(id, packageName, imageURL,description);
            packageInfo.add(packageInfo1);
        }
        return packageInfo;
    }

    public PackDetail getPackDetail(int id){
      String packageName = detailsMap.get(id).get(0);
       String imageURL = String.valueOf(imagesMap.get(id).get(0));
         int packageDuration =Integer.parseInt(detailsMap.get(id).get(2));
        Map<String,List<String>>  amenities = new HashMap<>();
         for( String aid : amenitiesMap.keySet()) {

             if( aid.contains(String.valueOf(id))){
                  amenities.put(aid,amenitiesMap.get(aid));

             }
         }
        Map<String,List<String>>  itinerary = new HashMap<>();
         for (String itkey : itinerariesMap.keySet()){
             if( itkey.startsWith(String.valueOf(id))){
                 itinerary.put(itkey,itinerariesMap.get(itkey));

             }
         }

        Map<String,List<String>> cities = new HashMap<>();
         for ( String ckey : citiesMap.keySet()){
             if( ckey.contains(String.valueOf(id))){
                 cities.put(ckey, citiesMap.get(ckey));
             }
         }
        Map<String,List<String>> packageType=new HashMap<>();

        for ( String pkey : packageTypesMap.keySet()){
            if( pkey.contains(String.valueOf(id))){
               packageType.put(pkey,packageTypesMap.get(pkey));

            }
        }
        String description = detailsMap.get(id).get(1);
         int stars= Integer.parseInt(detailsMap.get(id).get(3));
         String validFrom = detailsMap.get(id).get(4);
         String validTo = detailsMap.get(id).get(5);

         PackDetail packDetail = new PackDetail(id,packageName,packageDuration,amenities,itinerary,cities,description,stars,validFrom,validTo,packageType,imageURL);
         return packDetail;
    }
    List<PackDetail> allPackDetailsByCityName = new ArrayList<>();
    public List<PackDetail> searchPackageByCity(String cityName){
         int id;
     if(!allPackDetailsByCityName.isEmpty()){
         allPackDetailsByCityName.clear();
     }
        for ( String ckey : citiesMap.keySet()){
            String city = citiesMap.get(ckey).get(0);
            if( city.equalsIgnoreCase(cityName)){
                id= Integer.parseInt(ckey.substring(0,ckey.indexOf("@")));
                PackDetail packDetail = getPackDetail(id);
                allPackDetailsByCityName.add(packDetail);
            }

        }
    return allPackDetailsByCityName;
    }

    public List<PackDetail> sortPackages(String sortby){
        int len = allPackDetailsByCityName.size();
        for( int i=0;i<len-1;i++){
            for(int j=0;j<len-i-1;j++){
                switch(sortby){
                    case "duration" :
                        if(allPackDetailsByCityName.get(j).getPackageDuration()> allPackDetailsByCityName.get(j+1).getPackageDuration()){
                            PackDetail temp = allPackDetailsByCityName.get(j);
                            allPackDetailsByCityName.set(j,allPackDetailsByCityName.get(j+1));
                            allPackDetailsByCityName.set(j+1,temp);
                        }
                        break;
                    case "stars":
                        if(allPackDetailsByCityName.get(j).getStars()> allPackDetailsByCityName.get(j+1).getStars()){
                            PackDetail temp = allPackDetailsByCityName.get(j);
                            allPackDetailsByCityName.set(j,allPackDetailsByCityName.get(j+1));
                            allPackDetailsByCityName.set(j+1,temp);
                        }
                        break;

                }
            }
        }
    return allPackDetailsByCityName;
    }



}
