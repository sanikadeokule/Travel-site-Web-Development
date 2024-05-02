import React from "react"
import { useNavigate } from "react-router-dom";

const PackDetailComponent = ({packageData, onToggleItinerary , onTogglePackageType , isExpandedItinerary , isExpandedPackageType })=> {
    const navigate=useNavigate();
    console.log("isExpandedItinerary"+isExpandedItinerary);
    function bookPackageDetail(id){
        navigate(`/bookpackage/${id}`);
 
      }



      const sortedItineraries = Object.entries(packageData.itinerary).sort(
        (a, b) => {
          const day1 = parseInt(a[0].split("-")[1]);
          const day2 = parseInt(b[0].split("-")[1]);
          return day1 - day2;
        }
      );
     
    return (
        <div className="container">
            <div className="card">
                <img src={ packageData.imageURL} className="card-img-top" style={{height:"300px",objectFit:"cover"}}/> 
                <div className="card-body text-info text-center">
                <div className="card-header text-center">
                    <h2>{packageData.packageName}</h2> 
                    <p className="card-text"> {packageData.description}</p>
                    <p><strong>Description: </strong>{packageData.description}</p>
                    <p><strong>Duration: </strong>{packageData.packageDuration} days</p>
                    <p><strong>Stars: </strong>{packageData.stars}</p>
                    <p><strong>Valid From: </strong>{packageData.validFrom}</p>
                    <p><strong>Valid To: </strong>{packageData.validTo}</p>
                    <h5>Cities:</h5>
                    <ul className="list-group list-group-flush text-center">
                        {Object.entries(packageData.cities).map(([key, value]) => (
                            <li key={key} className="list-group-item text-center">
                                {value.join(", ")} days
                            </li>
                        ))}
                    </ul>
                    <div className="card-body">
              <button className="btn btn-primary" onClick={onToggleItinerary}>
                {isExpandedItinerary ? "Hide Itinerary" : "Show Itinerary"}
              </button>
              {isExpandedItinerary && (
                <div>
                  <h5 className="card-title">Itinerary</h5>
                  <ul className="list-group">
                    {sortedItineraries.map(([key, value]) => (
                      <li className="list-group-item" key={key}>
                        <strong>{value[0]}:</strong> {value[1]}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="card-body">
              <button className="btn btn-primary" onClick={onTogglePackageType}>
                {isExpandedPackageType
                  ? "Hide Package Type"
                  : "Show Package Type"}
              </button>
              {isExpandedPackageType && (
                <div>
                  <h5 className="card-title">Package Types</h5>
                  <ul className="list-group">
                    {Object.entries(packageData.packageType).map(
                      ([key, value]) => (
                        <li className="list-group-item" key={key}>
                          <strong>{value[0]}:</strong> Price: {value[1]}{" "}
                          Description: {value[2]}
                          <br />
                          <strong>Amenities:</strong>{" "}
                          {Object.keys(packageData.amenities).map((key) => {
                            if (
                              key.startsWith(`${packageData.id}${value[0]}`)
                            ) {
                              const amenity = packageData.amenities[key];

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
                </div>
              )}
            </div>


            
                   
                   
                    <div className="row">
                            <div className="col d-flex justify-content-center">
                                <button className="btn btn-secondary" onClick={()=>bookPackageDetail(packageData.id)}>

                               Book Package
                                </button>

                            </div>

                    </div>
                    
                </div>    

                
               

                
                
             </div>



        </div>
        </div>
    )




}
export default PackDetailComponent;


 /*<h5>Itinerary:</h5>
                        
                         <ul className="list-group">
                            {
                                sortedItineraries.map(([key,value])=>(
                                    <li className="list-group-item " key={key}>
                                        <strong> {value[0]}: </strong> {value[1]}

                                    </li>
                                ))
                            }
                         </ul>*/

                         /*initial error code for package type
                         div className="card-body">
              <button className="btn btn-primary" onClick={onTogglePackageType}>
                {isExpandedPackageType ? "Hide Package Type" : "Show Package Type"}
              </button>
              {isExpandedPackageType && (
                <div>
                  <h5 className="card-title">Package Type</h5>
                  <ul className="list-group">
                  {Object.entries(packageData.packageType).map(([key, value]) => (
                            <li key={key} className="list-group-item text-center">
                                {value.join(", ")}
                                <br />
                              
                    
                        {Object.entries(packageData.amenities).map((key) => {
                            if(key.startsWith(`${packageData.id}${value[0]}`)){
                                const amenity = packageData.amenities[key];
                                return (
                                    <li className="list-group-item" key={key}>
                                        {amenity}
                                    </li>
                                );
                            }
                        }
                           
                        )}
                     </li>
                        ))}
                  </ul>
                  
                    
                </div>
              )}
            </div> */