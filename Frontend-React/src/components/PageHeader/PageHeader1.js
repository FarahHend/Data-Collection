/*!

=========================================================
* BLK Design System React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/blk-design-system-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import FileList from "views/examples/Datasets.js";
import { Button, Container } from "reactstrap";
export default function PageHeader({ handleFileUpload }) {

    return (
        <div className="page-header header-filter">
          {/* ... (existing code) */}
          <Container>
            <div className="content-center brand">
              <h1 className="h1-seo">Datasets</h1>
              <h3 className="d-none d-sm-block">hhhhhhhhhhhhh</h3>
            </div>
            <div>
                
            </div>
            <div className="content-center brand">
              <input type="file" id="fileInput" style={{ display: "none" }} onChange={handleFileUpload} />
              <Button color="primary" onClick={() => document.getElementById("fileInput").click()}>
                Add Datasets
              </Button>
               </div>
          </Container>
        </div>
      );
    }