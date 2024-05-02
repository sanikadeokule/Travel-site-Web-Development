import React, { useEffect, useState } from "react"
import { getAllPackage } from "../services/TourService";
import { useNavigate } from "react-router-dom";




const ListPackageComponent=()=>{
const [packages, setPackages]=useState([]);
const [currentPage,setCurrentPage]=useState(1);
const packagesPerPage = 6;
const navigate = useNavigate();
useEffect(()=> {  
listPackages();
},[]);

function listPackages(){
    getAllPackage().then(
        (response)=> {
            setPackages(response.data);
        }
    ).catch( (error)=>{
        console.error(error);
    } );
}

const indexOfLastPackage =currentPage*packagesPerPage;
const indexOfFirtsPackage = indexOfLastPackage - packagesPerPage ;
const currentPackages = packages.slice(indexOfFirtsPackage,indexOfLastPackage);
const pageNos = [];
for( let i=1 ; i<= Math.ceil(packages.length/packagesPerPage);i++ ){
    pageNos.push(i);
}
const paginate = (pageNo )=>{ setCurrentPage(pageNo)}
function getPackageDetails (id) {
navigate (`/packagedetail/${id}`);
}
return (
    <div> 
    <div className="container">
    <h2>TRIPPY</h2>

        <div className="row">
            {currentPackages.map( (pack)=>(

            <div className="col-md-4 mb-4" key={pack.packageId}>
                <div className="card"style={{height:"400px",objectFit:"cover"}} >
                    <img className ="card-img-top"src={pack.imageURL} style={{height:"200px",objectFit:"cover"}}></img>
                    <div className="card-body">
                        <h5> {pack.packageName}</h5>
                        <p> {pack.description}</p>
                        <button className="btn btn-primary" onClick= {()=> getPackageDetails (pack.packageId)}> View Details </button>
                    </div>

                </div>

            </div>
            ))}

        </div>
        <nav><ul className="pagination"> 
            {
                pageNos.map((no)=>( 
                    <li className="page-item" key= {no}> 
                        <button className="page-link" onClick = { ()=> paginate (no)}>{no}</button>
                    </li>

                )
                )
            }



            </ul></nav>

    </div>
    </div>



)
}
export default ListPackageComponent;