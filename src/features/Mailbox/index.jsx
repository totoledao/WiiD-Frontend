import { useState } from 'react';
import { Box } from "@mui/material";

import TopBar from "./TopBar";
import Emails from "./Emails";

export default function Mailbox(){
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);

  return (

    <Box sx={{ flexGrow: 1, alignItems: "center", justifyContent:"center" }}>      
      <TopBar emails={emails} setEmails={setEmails} selectedEmails={selectedEmails} setSelectedEmails={setSelectedEmails} />
      <Emails emails={emails} setEmails={setEmails}
        selectedEmails={selectedEmails} setSelectedEmails={setSelectedEmails}
      />
    </Box>

  )
}