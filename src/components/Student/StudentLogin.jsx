import React from 'react'

function StudentLogin() {
return (
    <div className='text-center' style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px', width: '400px', margin: 'auto', marginTop: '50px' }}>
        <h1>Student Login</h1>
        <form style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" style={{ marginBottom: '10px', padding: '8px' }} />
            
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Enter your password" style={{ marginBottom: '10px', padding: '8px' }} />
            
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', cursor: 'pointer' }}>
                Login
            </button>
        </form>
    </div>
)
}

export default StudentLogin