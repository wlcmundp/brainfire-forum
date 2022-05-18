import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Forum from "./pages/Forum";
import ForumTopic from "./pages/ForumTopic";
import ForumQuestionDetail from "./pages/ForumQuestionDetail";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/admin">
          <Route exact path="/admin" />
          <Route exact path="forum" element={<Forum />} />
          <Route exact path="forum-topic/:id" element={<ForumTopic />} />
          <Route
            exact
            path="forum-question-detail/:id"
            element={<ForumQuestionDetail />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
