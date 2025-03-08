import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionsTable = ({ actions, onEdit, onDelete }) => {
    if (!actions.length) {
        return ( <
            Paper elevation = { 3 }
            sx = {
                { p: 3, textAlign: 'center' }
            } >
            <
            Typography > No actions found.Add some actions to get started! < /Typography> < /
            Paper >
        );
    }

    return ( <
        TableContainer component = { Paper }
        elevation = { 3 } >
        <
        Table >
        <
        TableHead >
        <
        TableRow >
        <
        TableCell > ID < /TableCell> <
        TableCell > Action < /TableCell> <
        TableCell > Date < /TableCell> <
        TableCell > Points < /TableCell> <
        TableCell align = "right" > Actions < /TableCell> < /
        TableRow > <
        /TableHead> <
        TableBody > {
            actions.map((action) => ( <
                TableRow key = { action.id } >
                <
                TableCell > { action.id } < /TableCell> <
                TableCell > { action.action } < /TableCell> <
                TableCell > { action.date } < /TableCell> <
                TableCell > { action.points } < /TableCell> <
                TableCell align = "right" >
                <
                IconButton color = "primary"
                onClick = {
                    () => onEdit(action)
                } >
                <
                EditIcon / >
                <
                /IconButton> <
                IconButton color = "error"
                onClick = {
                    () => onDelete(action.id)
                } >
                <
                DeleteIcon / >
                <
                /IconButton> < /
                TableCell > <
                /TableRow>
            ))
        } <
        /TableBody> < /
        Table > <
        /TableContainer>
    );
};

export default ActionsTable;