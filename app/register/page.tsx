"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import useSWR from 'swr';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Segments } from '@react-three/drei';


interface DescriptionElement {
  type: "paragraph" | "heading";
  children: Array<{
    type: "text";
    text: string;
  }>;
  level?: number; // Only exists for headings
}

interface ApiResponse {
  data: Array<{
    id: number;
    documentId: string;
    name: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    publishedAt: string; // ISO string
    description: Array<DescriptionElement>;
    participation_type: string;
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


const fetcher = (url: string): Promise<ApiResponse> => fetch(url).then((res) => res.json());


const TeamForm = () => {
  const [selectedSegment, setSelectedSegment]= useState<string | undefined>(undefined);
  const [paymentNumber, setPaymentNumber]= useState<string | undefined>(undefined);
  const [isTeam, setIsTeam]= useState<boolean>(false);

  const {data, error, isLoading} = useSWR<ApiResponse>("http://bracurobu.com:1337/api/segments", fetcher)
  
  const handleSegmentSelection = (documentId: string) => {
    setSelectedSegment(documentId);
    
    if (data?.data.filter(segment => segment.documentId == documentId)[0]["participation_type"] === "team") {
      setIsTeam(true);
    } else {
      setIsTeam(false);
    }
    
  } 

  const handlePaymentNumberChange = (event:ChangeEvent<HTMLInputElement>) => {
    setPaymentNumber(event.target.value);
    console.log(event.target.value);

  }

  const handleSubmit = async() => {
    try {
      const response = await fetch("http://bracurobu.com:1337/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: {
            segment: selectedSegment,
            isTeam: isTeam,
            payment: {identifier: paymentNumber}
          }
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Successfully submitted: ", result);
      } else {
        console.error("Failed to submit: ", response.statusText)
      }
    } catch (error) {
      console.error("Error in submitting", error)
    }
  };

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading segments</div>
  // else {
  //   console.log(data)
  //   data?.data.map(Segment => console.log(Segment.name));
  // }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Select value={selectedSegment} onValueChange={handleSegmentSelection}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select segment" />
        </SelectTrigger>
        <SelectContent>
          {data?.data.map(segment => <SelectItem value={segment.documentId}>{segment.name}</SelectItem>)}
        </SelectContent>
      </Select>
      <Input className='w-[250px]' type="number" placeholder="01795******" value={paymentNumber} onChange={handlePaymentNumberChange}/>
      <Button onClick={handleSubmit}>Submit</Button>
  </div>
  );
};

export default TeamForm;
