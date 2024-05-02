import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { getSearchData, getSortData } from "../services/TourService";
import PackDetailComponent from "./PackDetailComponent";
const PackageSearchComponent = ()=>{
    const {cityName} = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [expandedItinerary, setExpandedItinerary] = useState({});
  const [expandedPackageType, setExpandedPackageType] = useState({});
  const toggleSection = (section, packageId) => {
    switch (section) {
      case "itinerary":
        setExpandedItinerary((prevState) => ({
          ...prevState,
          [packageId]: !prevState[packageId],
        }));
        break;
      case "packageType":
        setExpandedPackageType((prevState) => ({
          ...prevState,
          [packageId]: !prevState[packageId],
        }));
        break;
      default:
        break;
    }
  };
    useEffect(()=> {
searchPackage();
    } , [cityName]);
    const handleSort=(sortType)=>{
        getSortData(sortType).then((response)=>{
            setSearchResults(response.data);
        }).catch((error)=>
    {
        console.error(error);
    })


    }


    const searchPackage = ()=> {
        getSearchData(cityName).then((response)=>{
            console.log(response.data);
            setSearchResults(response.data);
        }).catch((error)=> {
            console.log(error);
        })
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mb-4">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary" onClick={()=>handleSort("duration")}>
                         Sort By Duration
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={()=>handleSort("stars")}>
                         Sort By Rating
                        </button>

                    </div>

                </div>
                {searchResults.map((result)=>(
                    <div className="col-md-6 mb-4"  key={result.id} >
                        <PackDetailComponent
              packageData={result}
              onToggleItinerary={() => toggleSection("itinerary", result.id)}
              onTogglePackageType={() =>
                toggleSection("packageType", result.id)
              }
              isExpandedItinerary={expandedItinerary[result.id]}
              isExpandedPackageType={expandedPackageType[result.id]}
            />

                    </div>
                    




                )  )}

            </div>

        </div>





    )


}
export default PackageSearchComponent;