import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
  Avatar,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid
} from "@material-ui/core";
import {useEffect, useRef, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const HEIGHT_CARD_MEDIA = '200';
const ImagesUploader = ({ actions, selected, loading, ...props}) => {
  const [rows,setRows] = useState([]);
  const inputFile = useRef(null);

  const columns = [
    { field: 'referenciaSequencial', headerName: 'Secuencia', width: 150 },
    {
      field: 'preview',
      headerName: 'Preview',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        </div>
      ),
    },
    {
      field: 'rutaInforme',
      headerName: 'Ruta informe',
      width: 700,
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

  useEffect(()=>{
    setRows(props.rows);
  },[props.rows]);

  useEffect(()=>{
    actions.loadData({});
  },[]);

  const handleClickRow = (param, event) => {
    actions.setImage(param.row);
    actions.loadImage({id: param.row.rutaInforme});
  }

  const handleUploadImage = (event) => {
    inputFile.current.click();
  }

  const handleSelectImage = (event) => {
    if(event.target && event.target.files[0]){
      console.log(event.target.files[0])
      const file = event.target.files[0];
      actions.uploadImage({ file });
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={handleUploadImage}
        >
          <AddIcon fontSize="small" /> Nueva imagen
        </Button>
        <input
          id="input-file"
          type="file"
          accept="image/*"
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={handleSelectImage}/>
      </Grid>
      <Grid item xs={selected? 10:12}>
        <div style={{ height: 400, width: '100%', paddingRight: '20px'}}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            onRowClick={handleClickRow}
            loading={loading}
          />
        </div>
      </Grid>
      {selected && <Grid item xs={2} >
        <Card style={{width: '100%', height: '100%'}}>
          <CardActionArea>
            {selected.file?
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height={HEIGHT_CARD_MEDIA}
                image={selected.file}
                title="Contemplative Reptile"
              />
              :
              <CardMedia
                component="div"
                alt="Contemplative Reptile"
                title="Contemplative Reptile"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: `${HEIGHT_CARD_MEDIA}px`}}
              >
                <CircularProgress size={100}/>
              </CardMedia>}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {selected.rutaInforme}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {selected.descripcio}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={handleUploadImage}>
              Cambiar Imagen
            </Button>
          </CardActions>
        </Card>
      </Grid>}
    </Grid>
  );
}

export default ImagesUploader;