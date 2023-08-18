import styled from '@emotion/styled';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

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
          </Toolbar>
      </StyledAppBar>
  )
}

export default Header