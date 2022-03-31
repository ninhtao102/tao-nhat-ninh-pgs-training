import { Box, Grid, Link, Typography } from '@mui/material';
import moment from 'moment';
import { IUserParams } from '../../../../models/user';
import { titleExtenInfo } from '../../constant';
import React from 'react';

type Props = {
  dataDetail: IUserParams | undefined;
};

const ExtenInfo = (props: Props) => {
  const { dataDetail } = props;

  return (
    <>
      <Box sx={{ backgroundColor: '#1b1b38', padding: '2vh 5vh' }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {titleExtenInfo?.map((title, i) => {
              return (
                <Typography key={i} variant="subtitle1" sx={{ color: '#fff' }}>
                  {title.title}
                </Typography>
              );
            })}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              <Link href="#" underline="none">
                {dataDetail?.order_as_buyer}
              </Link>
              ($0.00)
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              &#36;{dataDetail?.income}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              &#36;{dataDetail?.expense}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              &#36;{dataDetail?.earning}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              {dataDetail?.products_total}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              {moment(dataDetail ? +dataDetail.joined : 0 * 1000).format('lll')}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              {moment(dataDetail ? +dataDetail.last_login : 0 * 1000).format('lll')}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              {dataDetail?.language}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: '#fff' }}>
              {dataDetail?.referer}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExtenInfo;
