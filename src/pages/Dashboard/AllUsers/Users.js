import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const Users = () => {
    const {data: users=[],refetch}=useQuery({
       queryKey:['users'],
       queryFn:async()=>{
        const res =await fetch('http://localhost:5000/dashboard/users')
        const data =await res.json();
        return data;
       }
        
    })
  const handleMakeAdmin=id=>{
        fetch(`https://first-sale-server.vercel.app/users/admin/${id}`, {
          method: 'PUT', 
          headers: {
              authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
      })
        .then(res => res.json())
        .then(data=>{
           if(data.modifiedCount > 0){
            toast.success('make addmin Successfully');
            refetch();
           }
        })

    } 
   
  const handleDelete= id => {
    const proceed = window.confirm("Are you Delete this Items");
    console.log(id);
    if(proceed){
        fetch(`http://localhost:5000/user/${id}`,{
            method: 'DELETE',
         headers:{
          authorization: `bearer ${localStorage.getItem('accessToken')}` 

         }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.deletedCount > 0){
                alert('deleted successFully');

                refetch()
            }
        })
    }
} 
    return (
        <div>
            <h1 className='text-2xl'>All users</h1>
            <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Admin</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
        {
            users.map((user,i) => <tr key={user._id}>
        <th>{i+1}</th>
        <td>{user.name}</td>
        <td>{user.email}</td>
         <td>{user?.role !== 'admin' &&<buttom onClick={()=> handleMakeAdmin(user._id)} className='btn bg-primary text-white mr-3'>Make Admin</buttom>}</td>
        <td><button onClick={()=> handleDelete(user._id)} className='btn  bg-error text-white'>Delete</button></td>
      
      </tr>
     )
        }
      
    </tbody>
  </table>
</div>


        </div>
    );
};

export default Users;