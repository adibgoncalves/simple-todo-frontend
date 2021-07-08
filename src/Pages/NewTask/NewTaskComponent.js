import React, {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import api from '../../Services/api';
import {format} from 'date-fns';
import HeaderComponent from '../../Components/Header/HeaderComponent';
import FooterComponent from '../../Components/Footer/FooterComponent';
import { NewTaskContainer } from './NewTaskComponent.style';
import { Form, Button } from 'react-bootstrap';

const NewTaskComponent = (props) => {
    const [redirect, setRedirect] = useState(false);
    const [type, setType] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    const LoadTaskDetails = async () => {
        await api.get(`/task/${props.match.params.id}`)
        .then(response => {
            setType(response.data.type)
            setDone(response.data.done)
            setTitle(response.data.tile)
            setDescription(response.data.description)
            setDate(format(new Date(response.data.when), 'yyy-MM-dd'))
            setTime(format(new Date(response.data.when), 'HH:mm'))
        })
    }

    const saveTask = async () => {
        if(!title){
            return alert("Você precisa informar o título da terefa")
        }else if(!description){
            return alert("Você precisa informar a descrição da terefa")
        }else if(!type){
            return alert("Você precisa selecionar o tipo da terefa")
        }else if(!date){
            return alert("Você precisa definir a data da terefa")
        }else if(!time){
            return alert("Você precisa definir a hora da terefa")
        }

        if(props.match.params.id) {
            await api.put(`/task/${props.match.params.id}`, {
                macaddress: "11:11:11:11:11:11",
                done: done,
                type: type,
                title: title,
                description: description,
                when: `${date}T${time}:00.000`
            }).then(() => {
                alert("Tarefa atualizada.")
                setRedirect(true);
            }).catch(response => {
                alert(response.status);
            })
        }

        await api.post('/task/new', {
            macaddress: "11:11:11:11:11:11",
            type: type,
            title: title,
            description: description,
            when: `${date}T${time}:00.000`
        }).then(() => {
            alert("Nova tarefa cadastrada.")
            setRedirect(true);
        }).catch(response => {
            alert(response.status);
        })
    }

    const remove = async () => {
        const res = window.confirm("Deseja realmente remover a tarefa?");
        if(res === true){
            await api.delete(`/task/${props.match.params.id}`)
            .then(() => setRedirect(true));
        }
    }

    useEffect(() => {
        LoadTaskDetails();
    },[LoadTaskDetails]);
    return(
        <NewTaskContainer>
            { redirect && <Redirect to="/" /> }
            <HeaderComponent />
                <div className="container">
                    <div className="mt-3 mt-lg-5">
                        <div className="row mb-3">
                            <div className="col-12 p-lg-0">
                                <h2>Nova tarefa</h2>
                            </div>
                        </div>

                        <Form className="row">
                            <Form.Group className="col-12 col-lg-6 pl-lg-0" controlId="exampleForm.ControlSelect1">
                                <Form.Label>Selecione o tipo da tarefa:</Form.Label>
                                <Form.Control as="select" onChange={(e) => {setType(e.target.value)}}>
                                    <option value="1">Estudo</option>
                                    <option value="2">Trabalho</option>
                                    <option value="3">Compras</option>
                                    <option value="4">Casa</option>
                                    <option value="5">Outro</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="col-12 col-lg-6 pr-lg-0" controlId="formBasicEmail">
                                <Form.Label>Títula da tarefa:</Form.Label>
                                <Form.Control type="email" placeholder="Título" onChange={(e) => {setTitle(e.target.value)}} value={title} />
                            </Form.Group>

                            <Form.Group className="col-12 col-lg-6 pl-lg-0" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Data:</Form.Label>
                                <Form.Control type="date" rows={3} onChange={(e) => {setDate(e.target.value)}} value={date}/>
                            </Form.Group>

                            <Form.Group className="col-12 col-lg-6 pr-lg-0" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Hora:</Form.Label>
                                <Form.Control type="time" rows={3} onChange={(e) => {setTime(e.target.value)}} value={time}/>
                            </Form.Group>

                            <Form.Group className="col-12 px-lg-0" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Descrição:</Form.Label>
                                <Form.Control as="textarea" rows={3} onChange={(e) => {setDescription(e.target.value)}} value={description}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Conluído: </Form.Label>
                                <Form.Check type="switch" checked={done} id="switch" onChange={() => setDone(!done)} label={ done ? "Concluída" : "Não concluída"}/>
                            </Form.Group>
                            
                            <div className="text-right w-100 p-3 p-lg-0">
                                <Button variant="success" onClick={saveTask}>Salvar tarefa</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            <FooterComponent />
        </NewTaskContainer>
    )
}

export default NewTaskComponent;