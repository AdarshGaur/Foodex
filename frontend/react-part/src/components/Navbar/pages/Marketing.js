import React from 'react';
import Carousel from "react-elastic-carousel";
import "./styled.css";
import Card from './card';


export default function Marketing() {
  return (
    <>
     <div className="marketing">
      <Carousel>
        <Card number="1"/>
        <Card number="2"/>
        <Card number="3"/>
        <Card number="4"/>
        <Card number="5"/>
        <Card number="6"/>
        <Card number="7"/>
        <Card number="8"/>
      </Carousel>
    </div>
    </>
  );
}
