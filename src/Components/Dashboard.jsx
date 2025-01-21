import React, { useContext } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import '../CSS/Dashboard.css';
import { SlCalender } from "react-icons/sl";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import EarningsAndExpensesChart from './EarningsAndExpensesChart';
import { AiOutlineStop } from "react-icons/ai";
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from './UserContext';
import { toast } from 'react-toastify';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
    const { users } = useContext(UserContext);
    const location = useLocation();

    React.useEffect(() => {
      if (location.state?.message) {
          
          toast.success(location.state.message, 
            {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
          }
        );
          // window.history.replaceState({}, document.title);
      }
  }, [location.state]);

  const data = {
    labels: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5'],
    datasets: [
      {
        label: 'Running Projects',
        data: [5, 2, 7, 3, 4],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',  
          'rgba(54, 162, 235, 0.6)',  
          'rgba(255, 206, 86, 0.6)',  
          'rgba(75, 192, 192, 0.6)',  
          'rgba(153, 102, 255, 0.6)'  
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 0.5,
      },
    ],
  };

  
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Running Projects Dashboard',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Projects',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Tasks',
        },
        beginAtZero: true,
      },
    },
  };

 
 

  return (
    <>
      <div className="homecontainer"  >
        <div className="container mt-4">
          <Row className='cardrow'>

            <Col className="mb-4">
              <Card className='custom-card'>
                <Link to="/users" style={{textDecoration:"none",color:"white"}}><Card.Body>
                  <Card.Title>Active Users</Card.Title>
                  <Card.Text>{users.length}</Card.Text>
                </Card.Body></Link>
              </Card>
            </Col>

            
            <Col className="mb-4">
              <Card className='custom-card'>
                <Card.Body>
                  <Card.Title>Active Admins</Card.Title>
                  <Card.Text>10</Card.Text>
                </Card.Body>
              </Card>
            </Col>

           
            <Col className="mb-4">
              <Card className='custom-card'>
                <Card.Body>
                  <Card.Title>Total Expenses</Card.Title>
                  <Card.Text>$5,000</Card.Text>
                </Card.Body>
              </Card>
            </Col>

           
            <Col className="mb-4">
              <Card className='custom-card'>
                <Card.Body>
                  <Card.Title>Running Projects</Card.Title>
                  <Card.Text>8</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <Row className="g-4 eventrow">
         
          <Col className="event show xs={12} md={6}" style={{ display: 'block', position: 'initial' }}>
            <div className='eventcontainer'>
              <div className='eventsdiv'>
                <h3>Upcoming Events</h3>
             </div>  

              {[{
                name: 'Marketing Policy',
                location: 'Bangladesh',
                buttonLabel: 'Email',
              },
              {
                name: 'Accounting Policy',
                location: 'Kolkata',
                buttonLabel: 'Skype',
              },
              {
                name: 'Marketing Policy',
                location: 'Madrid-Spain',
                buttonLabel: 'Phone',
              },
              {
                name: 'Finance Policy',
                location: 'Australia',
                buttonLabel: 'Mobile',
              }].map((event, index) => (
                <div key={index}>
                  <div className='d-flex eventeachrow'>
                    <div className="calicon"><SlCalender /></div>
                    <div className="eventname">
                      <h6 style={{ width: "195px" }}>{event.name}</h6>
                      <p>{event.location}</p>
                    </div>
                    <div className="eventbutton">
                      <button className='btn'>{event.buttonLabel}</button>
                    </div>
                  </div>
                  <hr className='rule' />
                </div>
              ))}
            </div>
          </Col>

          
          <Col className="modal show xs={12} md={6}" style={{ display: 'block', position: 'initial' }}>
            <div className="chart-container">
              <div className="runningpjctsdiv">
                <h3>Running Projects</h3>
              </div>
              <div className="chart-wrapper">
                <Bar className='chart2' data={data} options={options} />
              </div>
            </div>
          </Col>
        </Row>

        <div className='d-flex row2'>
         
          <EarningsAndExpensesChart />

          <div className='pendingcontainer'>
            <div className='pendingdiv'>
              <h3>Pending Works</h3>
            </div>

            {[{
              name: 'Database Tools',
              date: 'July 25, 2024 for Alimul',
              status: 'progressing',
              statusClass: 'btnprogress',
            },
            {
              name: 'Cables',
              date: 'Jan 04, 2024 for Alimul',
              status: 'success',
              statusClass: 'btnsuccess',
            },
            {
              name: 'Transaction',
              date: 'Feb 02, 2024 for Alzray',
              status: 'Failed',
              statusClass: 'btnfail',
            },
            {
              name: 'Training Tools',
              date: 'June 25, 2024 for Alzray',
              status: 'success',
              statusClass: 'btnsuccess',
            }].map((pending, index) => (
              <div key={index}>
                <div className={`d-flex pendingeachrow ${pending.status === 'progressing' ? 'progressed' : pending.status === 'success' ? 'success' : 'failed'}`}>
                  <div className="stopicon"><AiOutlineStop /></div>
                  <div className="eventname">
                    <h6 style={{ width: "195px" }}>{pending.name}</h6>
                    <p>{pending.date}</p>
                  </div>
                  <div className="pendingbutton">
                    <button className={pending.statusClass}>{pending.status}</button>
                  </div>
                </div>
                <hr className='rule' />
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Dashboard;
