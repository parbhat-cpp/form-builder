import styled from '@emotion/styled';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledAppBar = styled(AppBar)({
    background: '#f4f4f4',
    boxShadow: 'none',
})

function Header() {
  return (
      <StyledAppBar>
          <Toolbar>
              <ArticleIcon color='primary' style={{ marginRight: 10 }} fontSize='large' />
              <Typography color={'black'}>
                  Forms
              </Typography>
              <Box style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                  <AccountCircleIcon color='action' style={{ fontSize: 34 }} />
              </Box>
          </Toolbar>
      </StyledAppBar>
  )
}

export default Header