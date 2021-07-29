import { useState } from 'react';
import Button from '@material-ui/core/Button';
import styled, { css } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: '2rem 0'
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }),
);

interface BackgroundVariant {
    variant: string;
}

const StyledFooterDiv = styled.div`
    text-align: center;
    font-size: 1.15em;
`;

const StyledAnchorTag = styled.a`
    text-decoration: none;
    color: #2978B5;
`;

const StyledParagraphTag = styled.span`
    color: #2978B5;
`;

const StyledTable = styled.table`
    border: 1px solid rgb(220,220,220);
    width: 100%;
    margin-bottom: 2rem;
`;

const StyledTHead = styled.thead`
    text-align: left;
    font-weight: 600;
    color: black;
    padding: 0.5rem;
`;

const StyledTh = styled.th`
    padding: 1rem;
    border-bottom: 1px solid rgb(220,220,220);
`;

const variantOptions : any = {
    green: {
        backgroundColor: "rgb(144, 238, 144)",
        color: "#000",
        fontWeight: 600
    },
    yellow: {
        backgroundColor: "rgb(255, 255, 0)",
        color: "#000",
        fontWeight: 600
    },
    orange: {
        backgroundColor: "rgb(255, 169, 0)",
        color: "#000",
        fontWeight: 600
    },
    red: {
        backgroundColor: "rgb(255, 0, 0)",
        color: "#fff",
        fontWeight: 600
    },
    purple: {
        backgroundColor: "rgb(255, 102, 255)",
        color: "#fff",
        fontWeight: 600
    },
};

const StyledTdNoVariant = styled.td`
    padding: 1rem;
    border-bottom: 1px solid rgb(220,220,220);
    border-right: 0.5px solid rgb(220,220,220);
`;

const StyledTd = styled.td.attrs((props: BackgroundVariant) => ({
    title: props.variant,
}))<BackgroundVariant>`
    padding: 1rem;
    border-bottom: 1px solid rgb(220,220,220);
    ${props => props.variant && variantOptions[props.variant] && css`
       background-color: ${variantOptions[props.variant].backgroundColor};
       color: ${variantOptions[props.variant].color};
       font-weight: ${variantOptions[props.variant].fontWeight};
   `}
   border-right: 0.5px solid rgb(220,220,220);
`;


const Modal = (props: any) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    return (
        <Grid container className={classes.root} >
            <Grid item xs={12}>
                <StyledFooterDiv>
                    <div>
                        <strong>VECTOR:</strong> <StyledParagraphTag>{props.vector}</StyledParagraphTag>
                    </div>
                    <StyledAnchorTag href="#" onClick={handleClickOpen}>
                        How is Severity Risk calculated?
                    </StyledAnchorTag>
                </StyledFooterDiv>
            </Grid>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    How is Severity Risk calculated?
                </DialogTitle>
                <IconButton 
                    aria-label="close" 
                    className={classes.closeButton} 
                    onClick={handleClose}
                >
                <CloseIcon />
                </IconButton>
                <DialogContent>
                    <StyledTable>
                        <StyledTHead>
                            <tr>
                                <StyledTh colSpan={2}>
                                    Likelihood and Impact Levels
                                </StyledTh>
                            </tr>
                        </StyledTHead>
                        <tbody>
                            <tr>
                                <StyledTdNoVariant>{`0 < 3`}</StyledTdNoVariant>
                                <StyledTd variant="green">Low</StyledTd>
                            </tr>
                            <tr>
                                <StyledTdNoVariant>{`3 to < 6`}</StyledTdNoVariant>
                                <StyledTd variant="orange">Medium</StyledTd>
                            </tr>
                            <tr>
                                <StyledTdNoVariant style={{borderBottom: 'none'}}>{`6 to 9`}</StyledTdNoVariant>
                                <StyledTd variant="red">High</StyledTd>
                            </tr>
                        </tbody>
                    </StyledTable>

                    <StyledTable>
                        <StyledTHead>
                            <tr>
                                <StyledTh colSpan={5}>
                                    Overall Risk Severity = Likelihood x Impact
                                </StyledTh>
                            </tr>
                        </StyledTHead>
                        <tbody>
                            <tr>
                                <StyledTdNoVariant rowSpan={4}>Impact</StyledTdNoVariant>
                                <StyledTdNoVariant>HIGH</StyledTdNoVariant>
                                <StyledTd variant="orange">Medium</StyledTd>
                                <StyledTd variant="red">High</StyledTd>
                                <StyledTd variant="purple">Critical</StyledTd>
                            </tr>
                            <tr>
                                <StyledTdNoVariant>MEDIUM</StyledTdNoVariant>
                                <StyledTd variant="yellow">Low</StyledTd>
                                <StyledTd variant="orange">Medium</StyledTd>
                                <StyledTd variant="red">High</StyledTd>
                            </tr>
                            <tr>
                                <StyledTdNoVariant>LOW</StyledTdNoVariant>
                                <StyledTd variant="green">Note</StyledTd>
                                <StyledTd variant="yellow">Low</StyledTd>
                                <StyledTd variant="orange">Medium</StyledTd>
                            </tr>
                            <tr>
                                <StyledTdNoVariant></StyledTdNoVariant>
                                <StyledTdNoVariant>LOW</StyledTdNoVariant>
                                <StyledTdNoVariant>MEDIUM</StyledTdNoVariant>
                                <StyledTdNoVariant>HIGH</StyledTdNoVariant>
                            </tr>
                            <tr>
                                <StyledTdNoVariant style={{borderBottom: 'none'}}></StyledTdNoVariant>
                                <StyledTdNoVariant colSpan={4} style={{borderBottom: 'none',borderRight: 'none'}}>Likelihood</StyledTdNoVariant>
                            </tr>
                        </tbody>
                    </StyledTable>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}

export default Modal