import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, Button, Grid, Input, Switch, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Control, Controller, useForm } from 'react-hook-form';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IProductParams } from '../../../../models/product';
import { IBrands, ICategories } from '../../../../models/utils';
import { titleAddProductForm } from '../../constant';
import { baseInputStyle } from '../../pages/AddProductPage';
import PriceInventoryForm from './PriceForm';
import ShippingForm from './ShippingForm';
import Marketing from './Marketing';

interface Props {
  control: Control<IProductParams, any>;
}

const AddProductForm = (props: Props) => {
  const [brands, setBrands] = useState<IBrands[]>();
  const [categories, setCategories] = useState<ICategories[]>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductParams>({
    mode: 'onBlur',
  });

  const onSubmit = (data: IProductParams) => {
    console.log('data', data);
  };

  const fetchBrands = useCallback(() => {
    fetch(API_PATHS.brands, API_HEADER)
      .then((response) => response.json())
      .then((data) => {
        setBrands(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  const fetchCategories = useCallback(() => {
    fetch(API_PATHS.categories, API_HEADER)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
  }, [fetchBrands, fetchCategories]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ backgroundColor: '#1b1b38', padding: '2vh 5vh' }}>
        <Typography variant="h4" gutterBottom component="div" sx={{ color: '#fff' }}>
          Add Product
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleAddProductForm.map((title, i) => {
              return (
                <Box key={i} sx={{ display: 'flex', paddingTop: title.paddingValue }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff' }}>
                    {title.title}
                  </Typography>
                  {title.require === true ? <span style={{ color: 'red' }}>*</span> : null}
                </Box>
              );
            })}
          </Grid>

          <Grid item xs={8}>
            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="vendor"
                rules={{
                  required: { value: true, message: 'This field is requierd' },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="vendor"
                    color="secondary"
                    placeholder="Type Vendor to select"
                    sx={baseInputStyle}
                  />
                )}
              />
              {errors?.vendor?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.vendor?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="productTitle"
                render={({ field }) => <Input {...field} id="productTitle" color="secondary" sx={baseInputStyle} />}
              />
              {errors?.productTitle?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.productTitle?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="brand"
                rules={{
                  required: { value: true, message: 'This field is requierd' },
                }}
                render={({ field }) => (
                  <select {...field} defaultValue={''} style={baseInputStyle}>
                    <option value="" disabled selected hidden>
                      Type Brand name to select
                    </option>
                    {brands?.map((b) => {
                      return (
                        <option key={b.id} value={b.id} style={baseInputStyle}>
                          {b.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
              {errors?.brand?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.brand?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="condition"
                rules={{
                  required: { value: true, message: 'This field is requierd' },
                }}
                render={({ field }) => (
                  <select {...field} defaultValue={''} style={baseInputStyle}>
                    <option value="" disabled selected hidden></option>
                    <option value="Used" style={baseInputStyle}>
                      Used
                    </option>
                  </select>
                )}
              />
              {errors?.condition?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.condition?.message}
                </p>
              )}
            </Box>

            <Box sx={{ marginTop: '2vh' }}>
              <Controller
                control={control}
                name="sku"
                defaultValue={Date.now().toString()}
                render={({ field }) => <Input {...field} id="sku" color="secondary" sx={baseInputStyle} />}
              />
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="images"
                // rules={{
                //   required: { value: true, message: 'This field is requierd' },
                // }}
                render={({ field }) => (
                  <Button
                    variant="outlined"
                    component="label"
                    size="large"
                    sx={{ color: '#fff', width: '12vw', height: '12vh' }}
                  >
                    <CameraAltRoundedIcon fontSize="large" />
                    <input
                      {...field}
                      type="file"
                      accept="image/*"
                      hidden
                      // multiple
                      onChange={(e) => {
                        console.log('aaaaaaa', e.target.files);
                      }}
                    />
                  </Button>
                )}
              />
              {errors?.images?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.images?.message}
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="category"
                rules={{
                  required: { value: true, message: 'This field is requierd' },
                }}
                render={({ field }) => (
                  <select {...field} defaultValue={''} style={baseInputStyle}>
                    <option value="" disabled selected hidden>
                      Type Categories name to select
                    </option>
                    {categories?.map((c) => {
                      return (
                        <option key={c.id} value={c.id} style={baseInputStyle}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              />
              {errors?.category?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.category?.message}
                </p>
              )}
            </Box>

            <Box sx={{ marginTop: '2vh' }}>
              <Controller
                control={control}
                name="description"
                rules={{
                  required: { value: true, message: 'This field is requierd' },
                }}
                render={({ field: { value, onChange } }) => (
                  <Editor
                    editorState={value}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onChange}
                    editorStyle={{
                      backgroundColor: '#1b1b38',
                      minHeight: '20vh',
                      border: '1px solid white',
                      color: 'white',
                      padding: '0 1vh',
                    }}
                  />
                )}
              />
              {errors?.description?.message && (
                <p className="valid-field--message" style={{ padding: '1vh' }}>
                  {errors?.description?.message}
                </p>
              )}
            </Box>

            <Controller
              control={control}
              name="sale"
              render={({ field }) => <Switch {...field} defaultChecked id="sale" sx={{ marginTop: '2vh' }} />}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ backgroundColor: '#323259' }}>
        <PriceInventoryForm control={control} />
        <ShippingForm control={control} />
        <Marketing control={control} />
      </Box>

      <Box
        sx={{
          backgroundColor: '#323259',
          margin: '0 4vh',
          padding: '3vh 5vh',
          boxShadow: '1px 1px 11px #b18aff',
          width: '75%',
          position: 'fixed',
          top: '88vh',
        }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            display: 'flex',
            marginRight: '2vh',
            opacity: '0.5',
            backgroundColor: '#f0ad4e',
            '&: hover': {
              backgroundColor: '#f0ad4e',
              color: '#000',
            },
          }}
        >
          Add Product
        </Button>
      </Box>
    </form>
  );
};

export default AddProductForm;
