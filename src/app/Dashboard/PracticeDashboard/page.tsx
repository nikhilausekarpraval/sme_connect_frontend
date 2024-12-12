'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

type ListProps = {
    items: string[];
    title: string;
};

type DetailProps = {
    header: string;
    content: string;
};

const List: React.FC<ListProps> = ({ items, title }) => {
    return (
        <div className="p-4 border rounded shadow-sm">
            <h5 className="mb-3">{title}</h5>
            <ul className="list-group">
                {items.map((item, index) => (
                    <li key={index} className="list-group-item">
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Detail: React.FC<DetailProps> = ({ header, content }) => {
    return (
        <div className="p-4 border rounded shadow-sm mb-3">
            <h5>{header}</h5>
            <p>{content}</p>
        </div>
    );
};

const ThreeColumnLayout: React.FC = () => {
    
    const searchParams = useSearchParams();
    const data = searchParams.get('data');

    // Parse the data if necessary
    const parsedData = data ? JSON.parse(data) : {};

    const leftList = ["Item 1", "Item 2", "Item 3", "Item 4"];
    const rightList = ["Option A", "Option B", "Option C", "Option D"];
    const details = [
        { header: "Detail Box 1", content: "This is the content for detail box 1." },
        { header: "Detail Box 2", content: "This is the content for detail box 2." },
    ];

    return (
        <div className="d-flex" style={{ height: '100vh' }}>

            <div className="flex-shrink-0" style={{ width: '30%' }}>
                <List items={leftList} title="Left List" />
            </div>


            <div className="flex-grow-1 mx-3" style={{ width: '40%' }}>
                <div>{parsedData.key.title}</div>
                {details.map((detail, index) => (
                    <Detail key={index} header={detail.header} content={detail.content} />
                ))}
            </div>


            <div className="flex-shrink-0" style={{ width: '30%' }}>
                <List items={rightList} title="Right List" />
            </div>
        </div>
    );
};

export default ThreeColumnLayout;
