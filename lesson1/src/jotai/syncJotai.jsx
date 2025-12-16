import React, { useState } from 'react';
import { useAtom } from 'jotai';
import {
  addUserAtom,
  chexbox,
  dataAtom,
  deleteUserAtom,
  editUserAtom,
} from '../jotaiStore/synctodo';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const SyncJotai = () => {
  const [data] = useAtom(dataAtom);
  const [, cheker] = useAtom(chexbox);
  const [, edituser] = useAtom(editUserAtom);
  const [, adduser] = useAtom(addUserAtom);
  const [, deletuser] = useAtom(deleteUserAtom);

  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState('all');

  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  const [editOpen, setEditOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editId, setEditId] = useState(null);

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(false);
    setNewName('');
    setNewAge('');
  };

  const handleAdd = () => {
      adduser({
        id: Date.now(),
        name: newName,
        age: newAge,
        status: false,
      });
      handleAddClose();
  };

  const handleEditOpen = (user) => {
    setEditName(user.name);
    setEditAge(user.age);
    setEditId(user.id);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditName('');
    setEditAge('');
    setEditId(null);
  };

  const handleEdit = () => {
      edituser({
        name: editName,
        age: editAge,
        id: editId,
      });
      handleEditClose();
  };

  const filteredData = data
    ?.filter((el) => {
      if (filtered === 'all') return true;
      if (filtered === 'true') return el.status === true;
      if (filtered === 'false') return el.status === false;
      return true;
    })
    ?.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Box sx={{ p: 3 }}>

      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddOpen}>
          Add User
        </Button>

        <TextField
          size="small"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filtered} label="Filter" onChange={(e) => setFiltered(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData?.length === 0 ? (
              <TableRow>
              </TableRow>
            ) : (
              filteredData?.map((el) => (
                <TableRow key={el.id} hover>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.age}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {el.status ? (
                        <>
                          <span style={{ color: 'green' }}>Active</span>
                        </>
                      ) : (
                        <>
                          <span style={{ color: 'red' }}>Inactive</span>
                        </>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary" onClick={() => handleEditOpen(el)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => deletuser(el.id)}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      color={el.status ? 'default' : 'success'}
                      onClick={() => cheker(el.id)}
                    >
                      <input type="checkbox"  />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={!newName || !newAge}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={editAge}
            onChange={(e) => setEditAge(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>
            edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SyncJotai;