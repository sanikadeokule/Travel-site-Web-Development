package com.travelsite.travelsite;

public class PackageInfo {
    private int packageId ;
    private String packageName;
    private String imageURL;
    private String description;


    public PackageInfo(int packageId, String packageName, String imageURL,String description) {
        this.packageId = packageId;
        this.packageName = packageName;
        this.imageURL = imageURL;
        this.description=description;

    }

    public int getPackageId() {
        return packageId;
    }

    public String getPackageName() {
        return packageName;
    }

    public String getImageURL() {
        return imageURL;
    }

    public String getDescription() {
        return description;
    }

}
