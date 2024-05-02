import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPackageDetail } from "../services/TourService";

const PackageBookingComponent=()=>{
    const [packageData, setPackageData] = useState(null);
    const {id}=useParams();

    const[selectedPackageType, setSelectedPackageType]=useState("");
    const handlePackageTypeChange = (e)=>{
        setSelectedPackageType(e.target.value);

    }
    const getAmountForPackageType=(packageType)=>{
        console.log(packageType);
        const key =`${packageData.id}${packageType}`;
        if(packageData && packageData.packageType[key]) {
            const amount = packageData.packageType[key][1];
            return amount;
        }
        return "";

    }
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const handleConfirmBooking=()=>{
        setBookingConfirmed(true);
      
    }
    





    useEffect(()=>{
        getPackageDetailForBooking();

    },[id]);
    const getPackageDetailForBooking=()=>{
        getPackageDetail(id).then((response)=>
    {
        setPackageData(response.data);
    }).then((error)=>
{
    console.error(error);
})
    }
if(!packageData){
    return <div>
        Loading Booking Data...
    </div>
}

return(
    <div classname="container">
        <h2> Package Booking </h2>

        <div className= "card">
            <div className="card-body">
                <h5 className="card-title">
                {packageData.packageName} 
                </h5>
                <p className="card-text">
                    {packageData.description}
                </p>
                

            </div>
            <div className="form-group" >
                <label>
                    Select Package Type : 
                </label>
                <select className="form-control" id="packageType" value={selectedPackageType} onChange={handlePackageTypeChange}>
                    <option value="">
                        Select Type 
                    </option>
                    {
                        Object.entries(packageData.packageType).map(([key,value])=> (
                            <option key={key} value={value[0]}>
                                {value[0]}
                                

                            </option>
                        )

                        )
                    }
                </select>
                {
                    selectedPackageType && (
                        <p>
                            Amount : {getAmountForPackageType(selectedPackageType)}
                        </p>

                    )

                }
                <button className="btn btn-primary mt-2" onClick={handleConfirmBooking} disabled={!selectedPackageType} >
                    Confirm Booking
                </button>
                {bookingConfirmed && <p>Booking Confirmed!</p>}


            </div>
            <p>
                
            </p>
        </div>

    </div>
)
}
export default PackageBookingComponent;