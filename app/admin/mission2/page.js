"use client";
import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Typography, Container, Paper } from '@mui/material';
import styles from "@/app/admin/style/step.module.css"
import Step1 from "./Step1"

const steps = ['Step 1', 'Step 2', 'Step 3']; // Define your steps here


const MultiStepForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className="flex h-screen overflow-hidden">

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <main>
                    <div className="container mx-auto px-4 sm:px-8">
                        <div className="py-8">
                            <Container maxWidth="lg">
                                <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                                    <Stepper activeStep={activeStep} alternativeLabel>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label} <Step1></Step1></StepLabel>
                                            </Step>

                                        ))}
                                    </Stepper>
                                    <div>
                                        {activeStep === steps.length ? (
                                            <div>
                                                <Typography>All steps completed</Typography>
                                                <Button onClick={handleReset}>Reset</Button>
                                            </div>
                                        ) : (
                                            <div>
                                                <Typography>{steps[activeStep]}</Typography>
                                                <div className={styles.btndiv}>
                                                    <Button className={styles.btnbg}   sx={{ mr: 2 }} disabled={activeStep === 0} onClick={handleBack}>
                                                        Back
                                                    </Button>
                                                    <Button className={styles.btnbg} variant="contained" color='primary'  onClick={handleNext}>
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>


                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Paper>
                            </Container>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    );
};

export default MultiStepForm;