import styled from "styled-components";
import React from "react";
//import { format } from "date-fns";

import { media } from "../../../../utils/media";

const Wrapper = styled.button`
  &&& {
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    border: none !important;
    box-shadow: none !important;
    border-radius: 50% !important;
    padding: 0 !important;
    margin: 0 !important;
    text-decoration: none !important;
    display: flex !important;
    width: 30px !important;
    height: 30px !important;
    background: rgba(255, 255, 255, 0.16) !important;
    justify-content: center !important;
    align-items: center !important;
    position: relative !important;
    &:hover {
      background: rgba(255, 255, 255, 0.26) !important;
    }
  }
`;

const Symbol = styled.div`
  &&& {
    font-size: 20px !important;
    color: white !important;
    font-family: "Montserrat" !important;

    margin-bottom: 9px !important;
    cursor: pointer !important;
  }
`;

const Modal = styled.div`
  &&& {
    position: absolute !important;
    top: 25px !important;
    right: 0px !important;
    border-radius: 5px 0px 5px 5px !important;
    padding: 14px !important;
    background: white !important;
    z-index: 30000 !important;
    cursor: pointer !important;
    box-shadow: 0px 8px 10px rgba(36, 38, 44, 0.06),
      0px 6px 30px rgba(99, 114, 130, 0.08),
      0px 16px 24px rgba(99, 114, 130, 0.1) !important;
  }
`;

const Text = styled.div`
  &&& {
    font-family: "Montserrat" !important;
    font-style: normal !important;
    font-weight: normal !important;
    font-size: 14px !important;
    color: #000000 !important;
    cursor: pointer !important;
  }
`;

export class AdditionalActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
  }

  activate() {
    this.setState({
      active: true,
    });
  }

  deactivate() {
    this.setState({
      active: false,
    });
  }

  render() {
    return (
      <Wrapper onClick={this.activate} onBlur={this.deactivate}>
        <Symbol>...</Symbol>
        {this.state.active && (
          <Modal
            onClick={(e) => {
              e.stopPropagation();
              this.props.endDialogue();
              this.deactivate();
            }}
          >
            <Text>Завершить&nbsp;диалог</Text>
          </Modal>
        )}
      </Wrapper>
    );
  }
}
/*<PlayIcon src={this.state.playIcon ? playV : pauseV} />*/

export default AdditionalActions;
