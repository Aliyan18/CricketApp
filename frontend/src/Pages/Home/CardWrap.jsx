import { useState, useEffect } from 'react';
import './stylesheets/card.css';
import { Card, CardHeader, CardBody, Text } from "@chakra-ui/react";

export default function CardWrap({ data }) {
    const formatScore = (score, format) => {
        if (format.toLowerCase() === 'test' && score.includes('&')) {
            return score.split('&').map((part, index) => (
                <div key={index}>
                    {part.split(/(\(\d+\.\d+\s*overs\))/g).map((subPart, subIndex) => (
                        <span key={subIndex} style={{ fontSize: /\(\d+\.\d+\s*overs\)/.test(subPart) ? '0.8rem' : '1rem' }}>
                            {subPart}
                        </span>
                    ))}
                </div>
            ));
        }
        return score;
    };

    return (
        <Card
            bg="silver"
            maxWidth="90%"
            width="50%"
            minWidth="355px"
            margin="20px"
            boxShadow="4px 4px 8px rgba(0,0,0,0.2), -4px -4px 8px rgba(255,255,255,0.2)"
            textAlign="center"
            color="rgb(50, 50, 50)"
            h="80%"
            overflowY="hidden"
            _hover={{
                cursor: "pointer",
                transform: "scale(1.01)",
                boxShadow: "4px 4px 8px rgba(0,0,0,0.2), 4px 4px 8px rgba(255,255,255,0.2)"
            }}
        >
            <CardHeader fontSize="1rem" padding='5px' paddingBottom={data.match_format === 'TEST' ? '-10px' : '5px'} paddingTop='10px' opacity='0.85'>
                <Text wordWrap="break-word" whiteSpace="normal">{data.series} {data.match_format}</Text>
            </CardHeader>

            <div style={{ display: "flex", flexDirection: "row" }}>
                <CardBody width="50%">
                    <Text fontWeight="700" fontSize={data['team1'].length > 18 ? '0.8rem' : '1rem'}>{data['team1']}</Text>
                    <Text>
                        {formatScore(data.team1_score, data.match_format)}
                    </Text>
                </CardBody>
                <CardBody width="50%">
                    <Text fontWeight="700" fontSize={data['team2'].length > 18 ? '0.8rem' : '1rem'}>{data['team2']}</Text>
                    <Text>
                        {formatScore(data.team2_score, data.match_format)}
                    </Text>
                </CardBody>
            </div>

            <div style={{ margin: 'auto' }}>
                <Text border="1px solid rgba(160, 160, 160, 1)"
                    boxShadow="inset 2px 2px 4px rgba(255, 255, 255, 0.6), inset -2px -2px 4px rgba(0, 0, 0, 0.3)"
                    borderRadius="5px"
                    p="0">
                </Text>
                <Text whiteSpace="normal" fontWeight="700">{data.status}</Text>
                <Text opacity='0.7'>{data.match_category}</Text>
            </div>
        </Card>
    );
}