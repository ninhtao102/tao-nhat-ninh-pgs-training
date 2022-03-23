import { Box, Checkbox, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import { IAccess } from '../../../../models/form';
import { baseInputStyle } from '../../pages/AddUserPage';
import { titleAccessForm } from '../../constant';

interface Props {}

const Access = (props: Props) => {
  const [formValues, setFormValues] = useState<IAccess>({
    accessLevel: '',
    memberShip: '',
    require: false,
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAccess>();

  return (
    <form>
      <Box sx={{ backgroundColor: '#1b1b38', marginTop: '2vh', padding: '5vh' }}>
        <Typography variant="h6" gutterBottom component="div" sx={{ color: '#fff' }}>
          Access information
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={2}>
            {titleAccessForm.map((title, i) => {
              return (
                <Box key={i} sx={{ display: 'flex', paddingTop: '2vh' }}>
                  <Typography variant="subtitle1" gutterBottom component="div" sx={{ color: '#fff', textAlign: 'end' }}>
                    {title.title}
                  </Typography>
                  {title.require === true ? <span style={{ color: 'red' }}>*</span> : null}
                </Box>
              );
            })}
          </Grid>

          <Grid item xs={4}>
            <Box sx={{ display: 'flex' }}>
              <Controller
                control={control}
                name="accessLevel"
                render={({ field }) => (
                  <select
                    {...field}
                    {...register('accessLevel', {
                      required: true,
                    })}
                    defaultValue={'Vendor'}
                    style={baseInputStyle}
                  >
                    <option value="Admin" style={baseInputStyle}>
                      Admin
                    </option>
                    <option value="Vendor" style={baseInputStyle}>
                      Vendor
                    </option>
                  </select>
                )}
              />
              {errors?.accessLevel?.type === 'required' && (
                <p className="valid-field--message" style={{ padding: '1vh 0' }}>
                  <FormattedMessage id="accessLevelRequire" />
                </p>
              )}
            </Box>

            <Box sx={{ display: 'flex', marginTop: '2vh' }}>
              <Controller
                control={control}
                name="memberShip"
                render={({ field }) => (
                  <select
                    {...field}
                    {...register('memberShip', {
                      required: false,
                    })}
                    defaultValue={'Ignore Membership'}
                    style={baseInputStyle}
                  >
                    <option value="Ignore Membership" style={baseInputStyle}>
                      Ignore Membership
                    </option>
                    <option value="General" style={baseInputStyle}>
                      General
                    </option>
                  </select>
                )}
              />
            </Box>

            <Controller
              control={control}
              name="require"
              render={({ field }) => (
                <Checkbox
                  {...field}
                  id="require-checkbox"
                  sx={{ color: '#fff', margin: '2vh 0' }}
                  onChange={(e) => setFormValues({ ...formValues, require: e.target.checked })}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Access;
