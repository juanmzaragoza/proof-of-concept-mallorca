import * as React from 'react';
import {useEffect, useRef, useState} from "react";
import {FormattedMessage} from "react-intl";
import PropTypes from "prop-types";

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
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const HEIGHT_CARD_MEDIA = '200';
const ImagesUploader = ({ id, parentId, actions, selected, loading, entityIndex, ...props}) => {
  const [rows,setRows] = useState([]);
  const inputFile = useRef(null);
  const [isUpdatingImg, setIsUpdatingImg] = useState(false);

  const columns = [
    {
      field: 'referenciaSequencial',
      headerName: props.intl.formatMessage({
        id: "ImagesUploader.secuencia",
        defaultMessage: "Secuencia"
      }),
      description: props.intl.formatMessage({
        id: "ImagesUploader.secuencia.descripcion",
        defaultMessage: "Secuencia generada automaticamente"
      }),
      width: 150 },
    {
      field: 'preview',
      headerName: props.intl.formatMessage({
        id: "ImagesUploader.previsualizacion",
        defaultMessage: "Previsualización"
      }),
      description: props.intl.formatMessage({
        id: "ImagesUploader.previsualizacion.descripcion",
        defaultMessage: "Previsualización del recurso"
      }),
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <div>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        </div>
      ),
    },
    {
      field: 'rutaInforme',
      headerName: props.intl.formatMessage({
        id: "ImagesUploader.rutaInforme",
        defaultMessage: "Ruta Informe"
      }),
      description: props.intl.formatMessage({
        id: "ImagesUploader.rutaInforme.descripcion",
        defaultMessage: "Ruta donde se encuentra guardada la imagen"
      }),
      width: 700,
      editable: true,
    },
    {
      field: "",
      headerName: props.intl.formatMessage({
        id: "Comun.acciones",
        defaultMessage: "Acciones"
      }),
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation();
          setRows(rows.filter(row => row.id !== params.id));
          actions.deleteImage({ key: id, id: params.id });
        };

        return <Button onClick={onClick}>
          <FormattedMessage id={"ImagesUploader.eliminar_imagen"} defaultMessage={"Eliminar"}/>
        </Button>;
      }
    },
  ];

  useEffect(()=>{
    setRows(props.rows);
  },[props.rows]);

  const loadData = () => {
    actions.loadData({ key: id, id: parentId });
  }
  useEffect(()=>{
    loadData();
  },[]);

  const handleClickRow = (param, event) => {
    actions.setImage(param.row);
  }

  useEffect(() => {
    if(selected) {
      const rutaInforme = selected.rutaInforme;
      actions.loadImage({ key: id, rutaInforme });
    }
  },[selected?.id]);

  const handleUploadImage = (event) => {
    inputFile.current.click();
  }

  const handleSelectImage = (event) => {
    //TODO() it only allow upload one file -> we need to change it to multiple?
    if(event.target && event.target.files[0]){
      const file = event.target.files[0];
      isUpdatingImg?
        actions.changeImage({ key: id, id: selected.id, file })
        :
        //TODO() articule is hardcoded
        actions.uploadImage({ key: id, id: parentId, entityIndex, file }); // articleInformacio ID
    }
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          style={{ marginBottom: '10px'}}
          onClick={(e) => {
            setIsUpdatingImg(false);
            handleUploadImage(e)
          }}
        >
          <AddIcon fontSize="small" />
          <FormattedMessage id={"ImagesUploader.nueva_imagen"} defaultMessage={"Nueva Imagen"}/>
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
                alt={selected.descripcio}
                height={HEIGHT_CARD_MEDIA}
                image={selected.file}
                title={selected.rutaInforme}
              />
              :
              <CardMedia
                component="div"
                alt="Loading indicator"
                title="Loading indicator"
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
            <Button size="small" color="primary" onClick={e => {
              setIsUpdatingImg(true);
              handleUploadImage(e);
            }}>
              <FormattedMessage id={"ImagesUploader.cambiar_imagen"} defaultMessage={"Cambiar Imagen"}/>
            </Button>
          </CardActions>
        </Card>
      </Grid>}
    </Grid>
  );
};

ImagesUploader.propTypes = {
  id: PropTypes.string.isRequired,
  parentId: PropTypes.string.isRequired,
  selected: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  actions: PropTypes.object,
  entityIndex: PropTypes.string.isRequired
};

export default ImagesUploader;