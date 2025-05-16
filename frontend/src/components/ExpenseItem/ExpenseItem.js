import React from 'react';
import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import { book, food, medical, tv, takeaway, clothing, freelance, circle, dollar, calender, comment, trash } from '../../utils/Icons';
import Button from '../Button/Button';

function ExpenseItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor
}) {

    console.log("Expense Indicator Color:", indicatorColor);

    const expenseCatIcon = () => {
        switch (category) {
            case 'education': return book;
            case 'groceries': return food;
            case 'health': return medical;
            case 'subscriptions': return tv;
            case 'takeaways': return takeaway;
            case 'clothing': return clothing;
            case 'travelling': return freelance;
            case 'other': return circle;
            default: return '';
        }
    };

    return (
        <ExpenseItemStyled indicator={indicatorColor}>
            <div className="icon">{expenseCatIcon()}</div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{dollar} {amount}</p>
                        <p>{calender} {dateFormat(date)}</p>
                        <p>{comment} {description}</p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color)'}
                            color={'#fff'}
                            iColor={'#fff'}
                            hColor={'var(--color-red)'}  
                            onClick={() => deleteItem(id)}
                        />
                    </div>
                </div>
            </div>
        </ExpenseItemStyled>
    );
}

const ExpenseItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;

    .icon {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i {
            font-size: 2.6rem;
        }
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;

        h5 {
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before {
                content: ''; 
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 50%;
            background: ${props => props.indicator || "var(--color-delete)"}; 
            position: absolute;
            left: -1rem; 
            top: 50%;
            transform: translateY(-50%);
            display: inline-block;
            border: 2px solid transparent;
            }
        }

        .inner-content {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                display: flex;
                align-items: center;
                gap: 1.5rem;

                p {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
    }
`;

export default ExpenseItem;