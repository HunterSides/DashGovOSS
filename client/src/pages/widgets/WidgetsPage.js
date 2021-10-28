import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, LinearProgress, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ProgressBar from "react-bootstrap/ProgressBar";
// styles
import useStyles from "./styles";
import "../widgets/components/Table/ProgressBarStyles.scss";
// components
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import CustomTable from "./components/Table/CustomTable";

export default function WidgetsPage(props) {
  var classes = useStyles();
  var theme = useTheme();
  /*
  var [superBlockData, setSuperBlockData] = useState([]);
  var [votingDeadline, setVotingDeadline] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  var [timeUntilFunding, setTimeUntilFunding] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  var [blocksRemaining, setBlocks] = useState({});
  var [deadlineDate, setDate] = useState({});
  var [allocatedFunds, setFunds] = useState({});
  var [rate, setRates] = useState({});
  var [fundedRate, setFundedRate] = useState({});*/
  var [proposalData, setProposalData] = useState([]);
  const proposal = [
    {
      name: "BrazilQ42021",
      payment_amount: 110,
      url: "https://www.dashcentral.org/p/DashBrazilQ42021",
      AbsoluteYesCount: 606,
      YesCount: 810,
      NoCount: 204,
      AbstainCount: 42,
      fCachedEndorsed: false,
      fCachedFunding: true,
      passing: true,
      pastTrigger: true,
    },
    {
      name: "dash-incubator-2021-q4",
      payment_amount: 500,
      url: "https://www.dashcentral.org/p/dash-incubator-2021-q4",
      AbsoluteYesCount: 405,
      YesCount: 412,
      NoCount: 7,
      AbstainCount: 1,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: true,
      pastTrigger: false,
    },
    {
      name: "Scoby-Society-investment",
      payment_amount: 540.6,
      url: "https://www.dashcentral.org/p/Scoby-Society-investment",
      AbsoluteYesCount: -121,
      YesCount: 79,
      NoCount: 200,
      AbstainCount: 60,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: true,
    },
    {
      name: "dash-text-q3-2021",
      payment_amount: 65,
      url: "https://www.dashcentral.org/p/dash-text-q3-2021",
      AbsoluteYesCount: 232,
      YesCount: 294,
      NoCount: 62,
      AbstainCount: 5,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: false,
    },
    {
      name: "DashCoreGroupCompProposalAug_Nov",
      payment_amount: 2423,
      url: "https://www.dashcentral.org/p/DCGCompProposalAug_Nov",
      AbsoluteYesCount: 848,
      YesCount: 964,
      NoCount: 116,
      AbstainCount: 9,
      fCachedEndorsed: false,
      fCachedFunding: true,
      passing: true,
      pastTrigger: true,
    },
    {
      name: "DashDeliveryService",
      payment_amount: 35,
      url: "https://www.dashcentral.org/p/Dash-delivery-service",
      AbsoluteYesCount: 142,
      YesCount: 288,
      NoCount: 146,
      AbstainCount: 54,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: true,
    },
    {
      name: "DashNext2021-2",
      payment_amount: 75,
      url: "https://www.dashcentral.org/p/DashNext2021-2",
      AbsoluteYesCount: 533,
      YesCount: 562,
      NoCount: 29,
      AbstainCount: 9,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: true,
      pastTrigger: true,
    },
    {
      name: "Dash-Core-Group-Legal-October-2021",
      payment_amount: 543,
      url: "https://www.dashcentral.org/p/DCG_Legal_Oct_2021",
      AbsoluteYesCount: 253,
      YesCount: 344,
      NoCount: 91,
      AbstainCount: 3,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: true,
    },
    {
      name: "DDVirtualVisa",
      payment_amount: 286,
      url: "https://www.dashcentral.org/p/DDVirtualVisa",
      AbsoluteYesCount: 810,
      YesCount: 812,
      NoCount: 2,
      AbstainCount: 9,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: true,
      pastTrigger: true,
    },
    {
      name: "Dash-Help-Q4",
      payment_amount: 56,
      url: "https://www.dashcentral.org/p/Dash-Help-Q4",
      AbsoluteYesCount: 222,
      YesCount: 299,
      NoCount: 77,
      AbstainCount: 5,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: true,
    },
    {
      name: "Towers",
      payment_amount: 35,
      url: "https://www.dashcentral.org/p/Towers",
      AbsoluteYesCount: 613,
      YesCount: 651,
      NoCount: 38,
      AbstainCount: 12,
      fCachedEndorsed: false,
      fCachedFunding: true,
      passing: true,
      pastTrigger: true,
    },
    {
      name: "DIF-OCT2021-FUNDING",
      payment_amount: 500,
      url: "https://www.dashcentral.org/p/DIF-OCT2021-FUNDING",
      AbsoluteYesCount: 264,
      YesCount: 289,
      NoCount: 25,
      AbstainCount: 0,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: true,
    },
    {
      name: "DashElectrumOct2021",
      payment_amount: 52,
      url: "https://www.dashcentral.org/p/DashElectrumOct2021",
      AbsoluteYesCount: 298,
      YesCount: 312,
      NoCount: 14,
      AbstainCount: 0,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: true,
    },
    {
      name: "dash-marketing-hub-2",
      payment_amount: 100,
      url: "https://www.dashcentral.org/p/dash-marketing-hub-2",
      AbsoluteYesCount: 202,
      YesCount: 262,
      NoCount: 60,
      AbstainCount: 52,
      fCachedEndorsed: false,
      fCachedFunding: false,
      passing: false,
      pastTrigger: true,
    },
  ];
  useEffect(() => {
    (async () => {
      setProposalData(proposal);
      /*const proposals = await axios.get("http://localhost:5000/proposals"); //replace localhost with ip of server 
      const superblocks = await axios.get("http://localhost:5000/superblocks");
      const dashRates = await axios.get(
        `https://rates2.dashretail.org/rates?source=dashretail&symbol=dashusd`,
      );
      const superblock = superblocks.data[0]; //used to calc deadline and date time
      const rates = dashRates.data[0];

      const pastTriggerObject = superblock.pastTrigger;
      const votingdeadline = superblock.nextsuperblock - 1662;
      const remainingDeadlineBlocks = votingdeadline - superblock.currentblock;
      const deadlineToMinutes = remainingDeadlineBlocks * 2.625;
      const remainingTime =
        (superblock.nextsuperblock - superblock.currentblock) * 2.625;
      const remainingBlocks =
        superblock.nextsuperblock - superblock.currentblock;
      const d = Math.floor(deadlineToMinutes / 1440);
      const h = Math.floor((deadlineToMinutes - d * 1440) / 60);
      const m = Math.round(deadlineToMinutes % 60);
      const timeUntilDeadline = { days: d, hours: h, minutes: m };
      const dr = Math.floor(remainingTime / 1440);
      const hr = Math.floor((remainingTime - dr * 1440) / 60);
      const mr = Math.round(remainingTime % 60);
      const timeUntilFundingDispersed = { days: dr, hours: hr, minutes: mr };

      // Functions
      /*const dateFromMinutes = () => {
        var currentDate = new Date();
        var futureDate = new Date(
          currentDate.getTime() + deadlineToMinutes * 60000,
        );
        var options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };
        var stringifyDate = futureDate.toLocaleString("default", options);
        var newDate = stringifyDate;
        setDate(newDate);
      };*/

      /*const calcRates = async () => {
        var calcDashRate = Math.round(superblock.budget * rates.price);
        var newRate = calcDashRate.toLocaleString();
        setRates({ newRate });
      };*/

      /*const calcBudgetAllocation = () => {
        var allocatedFunds = proposal
          .filter((proposal) => proposal.fCachedFunding === true)
          .map((proposal) => proposal.payment_amount)
          .reduce((a, b) => a + b, 0);
        var roundFunds =
          Math.round((allocatedFunds + Number.EPSILON) * 100) / 100;
        var funds = roundFunds.toLocaleString();
        var calcFundedRate = Math.round(funds * rates.price);
        var newFundedRate = calcFundedRate.toLocaleString();

        setFundedRate({ newFundedRate });
        setFunds(funds);
      };*/

      /*const triggerToProposals = () => {
        proposal.forEach((v) => {
          v.pastTrigger = pastTriggerObject;
        });
        console.log(proposalData);
      };*/
      //triggerToProposals(proposal, pastTriggerObject);*/
      //dateFromMinutes(deadlineToMinutes);
      //calcRates(superblock, rates);
      //calcBudgetAllocation(proposal, rates);

      //setBlocks(remainingBlocks);
      //setProposalData(proposal);
      //setSuperBlockData(superblocks.data);
      //setVotingDeadline(timeUntilDeadline);
      //setTimeUntilFunding(timeUntilFundingDispersed);
    })();
  }, []);
  /*
  const toPercent = (decimal, fixed = 0) =>
    `${(decimal * 100).toFixed(fixed)}%`;

  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
  };

  const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => result + entry.value, 0);

    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total})`}</p>
        <ul className="list">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}(${getPercent(
                entry.value,
                total,
              )})`}
            </li>
          ))}
        </ul>
      </div>
    );
  };*/
  //#################################################################################################

  return (
    <>
      <div>
        <h3>
          This page is to illustrate widget functionality and style using
          manually generated data
        </h3>
      </div>
      <div className={classes.mainDivBody}>
        <div>
          <p>STATUS INDICATOR KEY GUIDE: (color on left of each proposal)</p>
          <p>Green = passing and will be funded</p>
          <p>Yellow = passing but will not be funded</p>
          <p>No Color = not yet passing </p>
          <p>Red = not passing and past trigger</p>
          <p>
            *corresponding voting data does not reflect the status indicator
            used in example widgets
          </p>
        </div>
        <Grid container spacing={3}>
          {proposalData.map((item) => (
            <Grid item xs={12} key={item.name}>
              <CustomTable {...item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}