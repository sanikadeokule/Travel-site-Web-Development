/* import React, { useEffect, useState } from "react";
import { getPackageDetail } from "../services/TourService";
import { useParams } from "react-router-dom";
const PackageDetailComponent = ()=> {
    const [packageDetail , setPackageDetail ] = useState(null);
    const {id} = useParams();
    useEffect( ()=> {
        getPackageDetailById();
    },[id]);

    const getPackageDetailById = ()=> {
         getPackageDetail (id).then((response)=> {
            setPackageDetail(response.data);
         }).catch((error)=> {
            console.error(error);
         });
    };
    if( !packageDetail ) {
        return <div> Loading package detail ...</div>
    }
    return (
        <div className="conatiner">
            <h2> {packageDetail.packageName}</h2>
            <p> <strong> Description : </strong>{packageDetail.description} </p>
            <p> <strong> Duration : </strong> {packageDetail.packageDuration} days</p>
            
            
            <p> <strong> Stars : </strong>{packageDetail.stars} </p>
            <p> <strong> Valid From : </strong>{packageDetail.validFrom} </p>
            <p> <strong> Valid To : </strong>{packageDetail.validTo} </p>
            <h3> Amenities : </h3>
            <ul>
                {
                    Object.entries(packageDetail.amenities).map(([key,value])=> (
                        <li key = {key}>
                            <strong> {key} : </strong> { value.join(", ")}
                        </li>
                    ))
                }
            </ul>
            <h2> Itinerary : </h2>
            <ul>
                {
                    Object.entries(packageDetail.itinerary).map(([key,value])=> (
                        <li key = {key}>
                         { value.join(", ")} 
                        </li>
                    ))
                }
            </ul>

            <h2> Cities : </h2>
            <ul>
                {
                    Object.entries(packageDetail.cities).map(([key,value])=> (
                        <li key = {key}>
                             { value.join(", ")} days
                        </li>
                    ))
                }
            </ul>

            <h2> Package Type : </h2>
            <ul>
                {
                    Object.entries(packageDetail.packageType).map(([key,value])=> (
                        <li key = {key}>
                             { value.join(", ")}
                        </li>
                    ))
                }
            </ul>
            
        </div>



    )

}

export default PackageDetailComponent ; */

/*code 2- */
/*import React, { useEffect, useState } from "react";
import { getPackageDetail } from "../services/TourService";
import { useParams } from "react-router-dom";

const PackageDetailComponent = () => {
    const [packageDetail, setPackageDetail] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        getPackageDetailById();
    }, [id]);

    const getPackageDetailById = () => {
        getPackageDetail(id)
            .then((response) => {
                setPackageDetail(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (!packageDetail) {
        return <div>Loading package detail ...</div>;
    }

    return (
        <div className="container">
            <div className="card border">
                <img src={packageDetail.imageURL} className="card-img-top img-fluid w-100" alt="Package Image" text-center style={{  height: '200px' }} />
                <div className="card-header text-center">
                    <h2>{packageDetail.packageName}</h2>
                </div>
                <div className="card-body text-info text-center">
                    <p><strong>Description: </strong>{packageDetail.description}</p>
                    <p><strong>Duration: </strong>{packageDetail.packageDuration} days</p>
                    <p><strong>Stars: </strong>{packageDetail.stars}</p>
                    <p><strong>Valid From: </strong>{packageDetail.validFrom}</p>
                    <p><strong>Valid To: </strong>{packageDetail.validTo}</p>
                    <h3>Amenities:</h3>
                    <ul className="list-group list-group-flush">
                        {Object.entries(packageDetail.amenities).map(([key, value]) => (
                            <li key={key} className="list-group-item">
                                <strong>{key}: </strong>{value.join(", ")}
                            </li>
                        ))}
                    </ul>
                    <h2>Itinerary:</h2>
                    <ul className="list-group list-group-flush text-center">
                        {Object.entries(packageDetail.itinerary).map(([key, value]) => (
                            <li key={key} className="list-group-item text-center">
                                {value.join(", ")}
                            </li>
                        ))}
                    </ul>
                    <h2>Cities:</h2>
                    <ul className="list-group list-group-flush text-center">
                        {Object.entries(packageDetail.cities).map(([key, value]) => (
                            <li key={key} className="list-group-item text-center">
                                {value.join(", ")} days
                            </li>
                        ))}
                    </ul>
                    <h2>Package Type:</h2>
                    <ul className="list-group list-group-flush text-center">
                        {Object.entries(packageDetail.packageType).map(([key, value]) => (
                            <li key={key} className="list-group-item text-center">
                                {value.join(", ")}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailComponent; */

import React, { useEffect, useState } from "react";
import { getPackageDetail } from "../services/TourService";
import { useNavigate, useParams } from "react-router-dom";

const PackageDetailComponent = () => {
    const [packageDetail, setPackageDetail] = useState(null);
    const { id } = useParams();
    const navigate= useNavigate();
    useEffect(() => {
        getPackageDetailById();
    }, [id]);

    const getPackageDetailById = () => {
        getPackageDetail(id)
            .then((response) => {
                setPackageDetail(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
     function bookPackageDetail(id){
       navigate(`/bookpackage/${id}`);

     }
    if (!packageDetail) {
        return <div>Loading package detail ...</div>;
    }
    
      const sortedItinerariesinId = Object.entries(packageDetail.itinerary).sort(
        (a,b) => {

            const day1= parseInt(a[0].split("-")[1]);
            const day2= parseInt(b[0].split("-")[1]);
            return day1-day2;
        }
      );
    return (
        <div className="container">
            <div className="card-columns">
                <div className="card border">
                    <img src={packageDetail.imageURL} className="card-img-top img-fluid w-100" alt="Package Image" style={{height:"400px"}}/>
                    <div className="card-header text-center">
                        <h2>{packageDetail.packageName}</h2>
                    </div>
                    <div className="card-body text-info text-center">
                        <p><strong>Description: </strong>{packageDetail.description}</p>
                        <p><strong>Duration: </strong>{packageDetail.packageDuration} days</p>
                        <p><strong>Stars: </strong>{packageDetail.stars}</p>
                        <p><strong>Valid From: </strong>{packageDetail.validFrom}</p>
                        <p><strong>Valid To: </strong>{packageDetail.validTo}</p>
                        <h5>Cities:</h5>
                        <ul className="list-group list-group-flush text-center">
                            {Object.entries(packageDetail.cities).map(([key, value]) => (
                                <li key={key} className="list-group-item">
                                    {value.join(", ")} days
                                </li>
                            ))}
                        </ul>
                        <h5>Itinerary:</h5>
                        <ul className="list-group list-group-flush text-center">
                            {sortedItinerariesinId.map(([key, value]) => (
                                <li key={key} className="list-group-item">
                                    {value.join(", ")}
                                </li>
                            ))}
                        </ul>
                
                        
                        <h5>Package Type:</h5>
                        <ul className="list-group list-group-flush text-center">
                        {Object.entries(packageDetail.packageType).map(
                      ([key, value]) => (
                        <li className="list-group-item" key={key}>
                          <strong>{value[0]}:</strong> Price: {value[1]}{" "}
                          Description: {value[2]}
                          <br />
                          <strong>Amenities:</strong>{" "}
                          {Object.keys(packageDetail.amenities).map((key) => {
                            if (
                              key.startsWith(`${packageDetail.id}${value[0]}`)
                            ) {
                              const amenity = packageDetail.amenities[key];

                              return (
                                <li className="list-group-item" key={key}>
                                  {amenity}
                                </li>
                              );
                            }
                          })}
                        </li>
                      )
                    )}
                            
                        </ul>
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-secondary" onClick={()=>bookPackageDetail(packageDetail.id)}>

                               Book Package
                                </button>

                            </div>

                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailComponent;

/* amenities part

<h5>Amenities:</h5>
                    <ul className="list-group list-group-flush">
                        {Object.entries(packageData.amenities).map(([key, value]) => (
                            <li key={key} className="list-group-item">
                                <strong>{key}: </strong>{value.join(", ")}
                            </li>
                        ))}
                    </ul>
                    */


                   /*
                   {Object.entries(packageDetail.packageType).map(
                      ([key, value]) => (
                        <li className="list-group-item" key={key}>
                          <strong>{value[0]}:</strong> Price: {value[1]}{" "}
                          Description: {value[2]}
                          <br />
                          <strong>Amenities:</strong>{" "}
                          {Object.keys(packageDetail.amenities).map((key) => {
                            if (
                              key.startsWith(`${packageDetail.id}${value[0]}`)
                            ) {
                              const amenity = packageDetail.amenities[key];

                              return (
                                <li className="list-group-item" key={key}>
                                  {amenity}
                                </li>
                              );
                            }
                          })}
                        </li>
                      )
                    )}

                   */