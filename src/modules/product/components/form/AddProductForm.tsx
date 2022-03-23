import CameraAltRoundedIcon from '@mui/icons-material/CameraAltRounded';
import { Box, Button, Grid, Input, Switch, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { API_HEADER, API_PATHS } from '../../../../configs/api';
import { IProductParams } from '../../../../models/product';
import { IBrands, ICategories } from '../../../../models/utils';
import { titleAddProductForm } from '../../constant';
import { baseInputStyle } from '../../pages/AddProductPage';

interface Props {}

const AddProductForm = (props: Props) => {
  const [brands, setBrands] = useState<IBrands[]>();
  const [categories, setCategories] = useState<ICategories[]>();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductParams>({
    mode: 'onBlur',
  });

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
    <form>
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
                render={({ field }) => (
                  <Input
                    {...field}
                    id="vendor"
                    color="secondary"
                    placeholder="Type Vendor to select"
                    sx={baseInputStyle}
                    {...register('vendor', {
                      required: true,
                    })}
                  />
                )}
              />
              {errors?.vendor?.type === 'required' && (
                <p className="valid-field--message">
                  <FormattedMessage id="vendorRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="productTitle"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="productTitle"
                    color="secondary"
                    sx={baseInputStyle}
                    {...register('productTitle', {
                      required: true,
                    })}
                  />
                )}
              />
              {errors?.productTitle?.type === 'required' && (
                <p className="valid-field--message">
                  <FormattedMessage id="titleRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="brand"
                render={({ field }) => (
                  <select
                    {...field}
                    {...register('brand', {
                      required: true,
                    })}
                    defaultValue={''}
                    style={baseInputStyle}
                  >
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
              {errors?.brand?.type === 'required' && (
                <p className="valid-field--message">
                  <FormattedMessage id="brandRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="condition"
                render={({ field }) => (
                  <select
                    {...field}
                    {...register('condition', {
                      required: true,
                    })}
                    defaultValue={''}
                    style={baseInputStyle}
                  >
                    <option value="" disabled selected hidden></option>
                    <option value="Used" style={baseInputStyle}>
                      Used
                    </option>
                  </select>
                )}
              />
              {errors?.condition?.type === 'required' && (
                <p className="valid-field--message">
                  <FormattedMessage id="conditionRequire" />
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
                      multiple
                      {...register('images', {
                        required: true,
                      })}
                    />
                  </Button>
                )}
              />
              {errors?.images?.type === 'required' && (
                <p className="valid-field--message">
                  <FormattedMessage id="imagesRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <select
                    {...field}
                    {...register('category', {
                      required: true,
                    })}
                    defaultValue={''}
                    style={baseInputStyle}
                  >
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
              {errors?.category?.type === 'required' && (
                <p className="valid-field--message">
                  <FormattedMessage id="categoriesRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ marginTop: '2vh' }}>
              <Controller
                control={control}
                name="description"
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
            </Box>

            <Controller
              control={control}
              name="sale"
              render={({ field }) => <Switch {...field} defaultChecked id="sale" sx={{ marginTop: '2vh' }} />}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AddProductForm;
