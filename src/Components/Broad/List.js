import React from "react";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCard, deleteStage, deleteUser } from "../../Store/Action";
function List() {
  const currentUser = useSelector((store) => store?.userStore?.currentUser);
  console.log(currentUser);
  const cards = useSelector((store) => store?.taskhubStage?.card);
  const stages = useSelector((state) => state.taskhubStage?.stages);
  const users = useSelector((store) => store?.userStore?.users);
  const dispatch = useDispatch();
  return (
    <div className="list">
      <div className="listItem" style={{ border: "1px solid black" }}>
        <Typography>User's</Typography>
        <Table className="listTable" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th">ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">mobile</TableCell>
              <TableCell align="center">email</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users &&
              users.map((user) => (
                <TableRow>
                  <TableCell variant="th">{user.id}</TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.mobileNumber}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.password}</TableCell>
                  <TableCell>
                    <DeleteIcon onClick={() => dispatch(deleteUser(user.id))} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="listItem" style={{ border: "1px solid black" }}>
        <Typography>Card's</Typography>
        <Table sx={{ width: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Stage Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => {
              return !card.isDelete ? (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {card.id?.slice(0, 6)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {card.stageId?.slice(0, 6)}
                  </TableCell>
                  <TableCell align="right">{card.title}</TableCell>{" "}
                  <TableCell align="right">{card.createdBy}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon onClick={() => dispatch(deleteCard(card.id))} />
                  </TableCell>
                </TableRow>
              ) : null;
            })}
          </TableBody>
        </Table>
      </div>
      <div className="listItem" style={{ border: "1px solid black" }}>
        <Typography>Deleted Card</Typography>
        <Table sx={{ width: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Stage Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => {
              return card.isDelete ? (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {card.id?.slice(0, 6)}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {card.stageId?.slice(0, 6)}
                  </TableCell>
                  <TableCell align="right">{card.title}</TableCell>{" "}
                  <TableCell align="right">{card.createdBy}</TableCell>
                  <TableCell align="right">
                    <DeleteIcon onClick={() => dispatch(deleteCard(card.id))} />
                  </TableCell>
                </TableRow>
              ) : null;
            })}
          </TableBody>
        </Table>
      </div>
      <div className="listItem" style={{ border: "1px solid black" }}>
        <Typography>Stage's</Typography>
        <Table sx={{ width: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>User Name</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stages &&
              stages.map((stage) => {
                return stage.isDelete ? (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {stage.id}
                    </TableCell>

                    <TableCell align="right">{stage.name}</TableCell>
                    <TableCell component="th" scope="row">
                      {stage.createdBy}
                    </TableCell>

                    <TableCell align="right">
                      <DeleteIcon
                        onClick={() => dispatch(deleteStage(stage.id))}
                      />
                    </TableCell>
                  </TableRow>
                ) : null;
              })}
          </TableBody>
        </Table>
      </div>
      <div className="listItem" style={{ border: "1px solid black" }}>
        <Typography>Stage's Not Deleted</Typography>
        <Table sx={{ width: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>User Name</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stages &&
              stages.map((stage) => {
                return !stage.isDelete ? (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {stage.id}
                    </TableCell>

                    <TableCell align="right">{stage.name}</TableCell>
                    <TableCell component="th" scope="row">
                      {stage.createdBy}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {stage.userID}
                    </TableCell>
                    <TableCell align="right">
                      <DeleteIcon
                        onClick={() => dispatch(deleteStage(stage.id))}
                      />
                    </TableCell>
                  </TableRow>
                ) : null;
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default List;
