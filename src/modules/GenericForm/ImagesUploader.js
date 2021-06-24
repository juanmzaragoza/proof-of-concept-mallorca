import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {Avatar, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid} from "@material-ui/core";
import {useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const ImagesUploader = () => {
  const [clickedRow, setClickedRow] = useState(null);
  const [rows,setRows] = useState([
    { id: 1, lastName: 'Snow', ruta_informe: 'Jon.jpg', age: 35 },
    { id: 2, lastName: 'Lannister', ruta_informe: 'Cersei.jpg', age: 42 },
    { id: 3, lastName: 'Lannister', ruta_informe: 'Jaime.jpg', age: 45 },
    { id: 4, lastName: 'Stark', ruta_informe: 'Arya.jpg', age: 16 },
    { id: 5, lastName: 'Targaryen', ruta_informe: 'Daenerys.jpg', age: null },
    { id: 6, lastName: 'Melisandre', ruta_informe: null, age: 150 },
    { id: 7, lastName: 'Clifford', ruta_informe: 'Ferrara.jpg', age: 44 },
    { id: 8, lastName: 'Frances', ruta_informe: 'Rossini.jpg', age: 36 },
    { id: 9, lastName: 'Roxie', ruta_informe: 'Harvey.jpg', age: 65 },
  ]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'preview',
      headerName: 'Preview',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <div>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        </div>
      ),
    },
    {
      field: 'ruta_informe',
      headerName: 'Ruta informe',
      width: 250,
      editable: true,
    },
    {
      field: "",
      headerName: "Acciones",
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          setRows(rows.filter(row => row.id !== params.id));
        };

        return <Button onClick={onClick}>Eliminar</Button>;
      }
    },
  ];

  const handleClickRow = (param, event) => {
    if(clickedRow && param.id === clickedRow.id){
      setClickedRow(null);
    } else{
      setClickedRow(param);
    }
  }

  const handleChangeImage = (event) => {
    window.alert("Abrir popup de selección de imagen y llamar al servicio para persistirla")
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={(e) => console.log(e)}
        >
          <AddIcon fontSize="small" /> Nueva imagen
        </Button>
      </Grid>
      <Grid item xs={clickedRow? 10:12}>
        <div style={{ height: 400, width: '100%', paddingRight: '20px'}}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            onRowClick={handleClickRow}
          />
        </div>
      </Grid>
      {clickedRow && <Grid item xs={2} >
        <Card style={{width: '100%', height: '100%'}}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="190"
              image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {clickedRow.row.ruta_informe}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={handleChangeImage}>
              Cambiar Imagen
            </Button>
          </CardActions>
        </Card>
      </Grid>}
    </Grid>
  );
}

export default ImagesUploader;