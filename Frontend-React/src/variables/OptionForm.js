import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Row, Col, Label } from 'reactstrap';

const OptionForm = ({ questionId, questionType }) => {
  const [options, setOptions] = useState([]);
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [optionText, setOptionText] = useState('');
  const [showConfirmButton, setShowConfirmButton] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const optionData = {
      optionText,
      question: {
        idQuestion: questionId,
      },
    };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/addoption', optionData);
      console.log('Option added successfully:', response.data);

      
      const newOption = { idOption: options.length + 1, optionText };
      setOptions((prevOptions) => [...prevOptions, newOption]);

      setOptionText('');
      setShowOptionForm(false);
      setShowConfirmButton(false);
      localStorage.setItem(`survey_confirm_${questionId}`, true);
    } catch (error) {
      console.error('Error adding option:', error.message);
    }
  };

  const handleDeleteOption = async (optionId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/auth/deleteoption/${optionId}`);
      console.log('Option deleted successfully');
      const updatedOptions = options.filter((option) => option.idOption !== optionId);
      setOptions(updatedOptions);
    } catch (error) {
      console.error('Error deleting option:', error.message);
    }
  };

  useEffect(() => {
    const isConfirmButtonHidden = localStorage.getItem(`survey_confirm_${questionId}`);
    setShowConfirmButton(!isConfirmButtonHidden);
    const fetchOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/auth/question/${questionId}`);
        console.log('Updated Options List:', response.data);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error.message);
      }
    };

    fetchOptions();
  }, [questionId]);

  return (
    <div>
      {questionType === 'TEXT_ZONE_TYPE' ? (
        <div>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="textarea"
                placeholder="Write something ..."
                id="optionText"
                value={optionText}
                onChange={(e) => setOptionText(e.target.value)}
              />
               {showConfirmButton && (
                <Row><Col md="8"></Col><Col md="4">
              <Button className="btn-simple" color="success" onClick={handleSubmit}>
                Confirm
              </Button>
              </Col></Row>
            )}
            </FormGroup>
          </form>
        </div>
      ) : (
        <div>
         <i className="tim-icons icon-tap-02" onClick={() => setShowOptionForm(true)}/>
          {showOptionForm && (
            <Modal modalClassName="modal-black" isOpen={showOptionForm} toggle={() => setShowOptionForm(false)}>
              <ModalHeader toggle={() => setShowOptionForm(false)}>New Option</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="text"
                      placeholder="Set option here"
                      value={optionText}
                      onChange={(e) => setOptionText(e.target.value)}
                    />
                  </FormGroup>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={() => setShowOptionForm(false)}>
                  Cancel
                </Button>
                <Button color="success" onClick={handleSubmit}>
                  Add
                </Button>
              </ModalFooter>
            </Modal>
          )}
          {options.map((option) => (
  <FormGroup key={option.idOption} check className="form-check-radio">
    <Label check>
      <Input
        type="radio"
        name={`question_${questionId}_options`}
        value={option.idOption}
       
      />
      <span className="form-check-sign" />
      {option.optionText}
    </Label>
    <Button
      size="sm"
      className="btn-simple"
      color="danger"
      onClick={() => handleDeleteOption(option.idOption)}
    >
      <i className="tim-icons icon-simple-delete" />
    </Button>
  </FormGroup>
))}

        </div>
      )}
    </div>
  );
};

export default OptionForm;