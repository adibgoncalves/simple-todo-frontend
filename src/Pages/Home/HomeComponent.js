import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../Services/api';
import TaskType from '../../Utils/TaskType';
import HeaderComponent from '../../Components/Header/HeaderComponent';
import FooterComponent from '../../Components/Footer/FooterComponent';
import { Table } from 'react-bootstrap';
import { HomeContainer, Filter } from './HomeComponent.style';

const Home = (props) => {
    const [tasks, setTasks] = useState([]);

    const getAllTasks = async () => {
        await api.get('/task/filter/all')
            .then((response) => {
                if(response.status === 200) {
                    setTasks(response.data);
                }
            })
            .catch((error) => {
                alert("Erro ao carregar todas as tarefas.");
                console.log(error);
            })
    }

    const getLateTasks = async () => {
        await api.get('/task/filter/late')
            .then((response) => {
                if(response.status === 200) {
                    setTasks(response.data);
                }
            })
            .catch((error) => {
                alert("Errro ao carregar as tarefas em atraso.");
                console.log(error);
            })
    }

    const getTodayTasks = async () => {
        await api.get('/task/filter/today')
            .then((response) => {
                if(response.status === 200) {
                    setTasks(response.data);
                }
            })
            .catch((error) => {
                alert("Erro ao cerregar tarefas do dia.");
                console.log(error);
            })
    }

    const getWeekTasks = async () => {
        await api.get('/task/filter/week')
            .then((response) => {
                if(response.status === 200) {
                    setTasks(response.data);
                }
            })
            .catch((error) => {
                alert("Erro ao carregar tarefas da semana.");
                console.log(error);
            })
    }

    const getMonthTasks = async () => {
        await api.get('/task/filter/month')
            .then((response) => {
                if(response.status === 200) {
                    setTasks(response.data);
                }
            })
            .catch((error) => {
                alert("Erro ao carregar tarefas do mês.");
                console.log(error);
            })
    }

    const getYearTasks = async () => {
        await api.get('/task/filter/year')
            .then((response) => {
                if(response.status === 200) {
                    setTasks(response.data);
                }
            })
            .catch((error) => {
                alert("Erro ao carregar tarefas do ano.")
                console.log(error);
            })
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    return(
        <HomeContainer>
            <HeaderComponent />
                <div className="container">
                    <div className="mt-3 mt-lg-5">
                        <div className="row">
                            <h6>Filtros:</h6>
                        </div>
                        <div className="row d-flex justify-content-between">
                            <Filter className="col-12 col-lg-2 shadow-sm" onClick={getAllTasks}>Todas</Filter>
                            <Filter className="col-12 col-lg-2 shadow-sm" onClick={getLateTasks}>Atrasadas</Filter>
                            <Filter className="col-12 col-lg-2 shadow-sm" onClick={getTodayTasks}>Hoje</Filter>
                            <Filter className="col-12 col-lg-2 shadow-sm" onClick={getWeekTasks}>Semana</Filter>
                            <Filter className="col-12 col-lg-2 shadow-sm" onClick={getMonthTasks}>Mês</Filter>
                            <Filter className="col-12 col-lg-2 shadow-sm" onClick={getYearTasks}>Ano</Filter>
                        </div>
                    </div>
                    
                    <div className="mt-3 mt-lg-5">
                        <div className="row">
                            <h6>Tarefas:</h6>
                        </div>
                        <div className="row">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Tipo</th>
                                        <th>Data</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tasks.map((task, index) => {
                                        const separateWhen = task.when.split('T');
                                        const date = separateWhen[0];
                                        const separateDate = date.split('-');
                                        const finalDate = `${separateDate[2]}/${separateDate[1]}/${separateDate[0]}`;
                                        const time = separateWhen[1];
                                        const separateTime = time.split(':');
                                        const finalTime = `${separateTime[0]}:${separateTime[1]}`
                                        return(
                                        <tr key={index+1}>
                                            <th>{index+1}</th>
                                            <td>{task.title}</td>
                                            <td>{task.description}</td>
                                            <td>{TaskType.map((type) => type.target === task.type ? type.value : false)}</td>
                                            <td>{`${finalDate} - ${finalTime}`}</td>
                                            <td>{task.done ? "Concluído" : "Não concluído"}</td>
                                            <td><Link to={`/task/${task._id}`}><i className="far fa-eye"></i></Link></td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            { tasks.length <= 0 ? <div className="w-100 text-center"><p><b>Não existem registros</b></p></div> : false}
                        </div>
                    </div>
                </div>
            <FooterComponent/>
        </HomeContainer>
    )
}

export default Home;