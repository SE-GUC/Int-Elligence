import  React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import Table from 'react-bootstrap/Table'
import ShowP from '../user/showPI'
import {Button} from 'react-bootstrap'

class ShowProfileI extends Component{

    constructor(props)
    {
        super(props)
        this.state = 
        {
            userInfo:[]
        }
    }
 
    componentDidMount = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
        axios.get('http://localhost:5000/routes/api/users/CertainUser',{headers: { "Authorization": localStorage.getItem('jwtToken') }})
        .then (res=> {
               this.setState({userInfo:[res.data.data]})
            })
            .catch(err=> console.log(err))
}

    tabRow(){
        return this.state.userInfo.map(function(info,i){
            return <ShowP info={info} key={i} />;
            
        });
    }

    
  render()
  {
      return (
          <div style={{ paddingLeft:'60px',justifyItems:"center"}}>
              
               <div
          style={{
            backgroundColor: "#123456",
            textAlign: "center",
            fontSize: "50px",
            color: "white",
            width: "100%"
          }}
        >
          Your Profile
        </div>
              
              <Table  bordered hover variant='gamed' size='sm'>

          <thead>
            <tr>
              <th>Name</th>
              <th>Gender</th>
              <th>Nationality </th>
              <th>Identification Type</th>
              <th>Identificaton Number</th>
              <th>Birthdate</th>
              <th>Address</th>
              <th>Email </th>
              <th>Telephone</th>
              <th>Fax </th>
              <th>Financial Balance</th>
          </tr>
          </thead>
          <tbody>
            {this.tabRow()}
            
            
          </tbody>
         </Table> 
         <Button href='/editProfile'>Edit Profile</Button>
         <Button href='/changePassword'>Change Password</Button>

             </div>
             )}

}

export default ShowProfileI