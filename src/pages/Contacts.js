import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import MapContainer from '../components/MapContainer';

import { ReactComponent as Phone } from '../vectors/contacts/phone.svg'
import { ReactComponent as Adress } from '../vectors/contacts/location.svg'
import { ReactComponent as Email } from '../vectors/contacts/email.svg'
import { withTranslation } from 'react-i18next';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            about: '',
            message: '',
            loading: false,
            validated: false,
            button: 'TID_BUTTON_SEND'
        };
    }

    onNameChange(event) {
        this.setState({name: event.target.value});
    }
    
    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onAboutChange(event) {
        this.setState({about: event.target.value});
    }

    onMessageChange(event) {
        this.setState({message: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        let isValid = true;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            isValid = false;
        }

        this.setState({validated: true});
        if (isValid)
        {
            this.sendEmail({message_html: this.state.message, from_name: this.state.name, from_about: this.state.about, reply_to: this.state.email}, form);
        }
    }

    sendEmail (variables, form) {
        form.reset();
        this.setState({loading: true});
        window.emailjs.send(
            'gmail', 'template_p4SccC0j',
            variables
            ).then(res => {
                console.log('Email successfully sent!');
                this.setState({
                    name: '',
                    email: '',
                    about: '',
                    message: '',
                    button: 'TID_BUTTON_SENТ'
                });
            })
            // Handle errors here however you like, or use a React error boundary
            .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err));
    }

    render() {
        const { t } = this.props;
        return (
            <Container fluid={true}>
                <Container className='contacts-header'>
                    <Row className='contacts-title'>
                        <p className='contacts-title-text'>{t("TID_CONTACT_US")}</p>
                    </Row>

                    <Row className='contacts-options'>
                        <Col className='contacts-col'>
                            <Phone style={{width: 23.8, height: 43.6}}/>
                            <p className='contacts-col-title'>{t("TID_PHONE")}</p>
                            <p className='contacts-col-text'><a href='tel:+359 889 60 56 09'>+359 889 60 56 09</a></p>
                        </Col>
                        <Col className='contacts-col middle'>
                            <Adress style={{width: 31.3, height: 43.6}}/>
                            <p className='contacts-col-title'>{t("TID_ADRESS")}</p>
                            <p className='contacts-col-text'>{t("TID_ADRESS_LOCAL1")}</p>
                            <p className='contacts-col-text'>{t("TID_ADRESS_LOCAL2")}</p>
                        </Col>
                        <Col className='contacts-col'>
                            <Email style={{width: 48, height: 43.6}}/>
                            <p className='contacts-col-title'>{t("TID_EMAIL")}</p>
                            <a href="mailto:kirova.dnastudio@gmail.com" className='contacts-col-text'>kirova.dnastudio@gmail.com</a>
                            <br></br>
                            <a href="mailto:nikoldesighn@gmail.com" className='contacts-col-text'>nikoldesighn@gmail.com</a>
                        </Col>
                    </Row>

                    <Form noValidate validated={this.state.validated} className='contacts-form' onSubmit={this.onSubmit.bind(this)}>
                        <Form.Group controlId='formName'>
                            <Form.Control required type='text' placeholder={t("TID_NAME")} value={this.state.name} onChange={this.onNameChange.bind(this)} />
                        </Form.Group>
                        <Form.Group controlId='formEmail'>
                            <Form.Control required type='email' placeholder={t("TID_EMAIL_ADRESS")} value={this.state.email} onChange={this.onEmailChange.bind(this)} />
                        </Form.Group>
                        <Form.Group controlId='formAbout'>
                            <Form.Control required type='text' placeholder={t("TID_EMAIL_ABOUT")} value={this.state.about} onChange={this.onAboutChange.bind(this)} />
                        </Form.Group>
                        <Form.Group controlId='formMessage'>
                            <Form.Control required as='textarea' rows={5} placeholder={t("TID_MESSAGE")} value={this.state.message} onChange={this.onMessageChange.bind(this)} />
                        </Form.Group>
                        <Form.Group controlId='formSubmit' className='col text-center'>
                            <Button type="submit" disabled={this.state.loading} className='contacts-button' size='lg'>{t(this.state.button)}</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </Container>
        )
    }
}

export default withTranslation()(Contacts);