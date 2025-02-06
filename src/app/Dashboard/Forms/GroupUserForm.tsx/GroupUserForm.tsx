
import {  createGroupUsersErrors, emptyGroupUsers, groupRoles } from "@/app/Constants/Constants";

import { IGroupUser, IUser, IUserGroup } from "@/app/Interfaces/Interfaces";
import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Loader from "@/app/Components/Loader/Loader";
import '../../../Common/Styles/Form.scss';
import GroupUserService from "@/app/Services/GroupUsersService";
import UsersService from "@/app/Services/usersService";
import GroupService from "@/app/Services/GroupService";



interface GroupUserFormProps {
    selectedGroupUser: IGroupUser | null | undefined;
    isEdit: boolean;
    isCreate: boolean;
    clearForm: (e: any) => void,
    save: () => void,
}

const GroupUserForm: React.FC<GroupUserFormProps> = ({ selectedGroupUser, isCreate, isEdit, clearForm, save }) => {

    const [groupUser, setGroupUser] = useState<any>(selectedGroupUser)
    const [errors, setErrors] = useState(createGroupUsersErrors)
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [groups,setGroups] = useState<IUserGroup[]>();
    const [users,setUsers] = useState<IUser[]>();
    const _userService = new UsersService();
    const _groupService = new GroupService();


    useEffect(() => {

        if (isEdit || isCreate) {
            setGroupUser(selectedGroupUser);
            loadData();
        }

    }, [isCreate, isEdit])


    const loadData = async () => {

        setIsLoading(true);
        setErrors(createGroupUsersErrors);

        try{

            const users = await _userService.getUsers();
            const allGroups = await _groupService.getGroups();
            setUsers(users?.value);
            setGroups(allGroups?.value?.data);

        }catch(e:any){
            console.log(e);
            setIsLoading(false);
        }

        setIsLoading(false);
    }

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        var result;
        var formError;
        try {
            if (Object.values(errors).filter((error) => error !== "").length <= 0) {

                if (isCreate) {
                    result = await new GroupUserService().addGroupUser(groupUser);
                }else {
                    result = await new GroupUserService().updateGroupUser(groupUser);
                }

                if (result?.statusCode != 200) {
                    formError = result?.value?.message

                    setErrors({ ...errors, userEmail: formError });
                    
                } else {
                    save();
                    clearFormData();
                }
            }
        } catch (e: any) {
            console.log(e);
            clearFormData();
        }

    }

    const clearFormData = () => {

        setGroupUser(emptyGroupUsers);
        setErrors(createGroupUsersErrors);
        clearForm(null);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
        const { id, value } = e.target;

        if(id == "group" || id =="userEmail"){
            setErrors(createGroupUsersErrors);
        }

        setGroupUser({
            ...groupUser,
            [id]: value,
        });
    };


    return (
        <div className="building-form-container">
            {isLoading && <Loader />}
            {/* <NotificationContainer/> */}
            <Modal
                show={isEdit || isCreate}
                onHide={() => clearFormData()}
                centered
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
            >
                <Modal.Header closeButton className="px-4 py-2">
                    <div className="building-form-header py-2 d-flex gap-4 align-items-center">
                        {isEdit ? "Edit" : "Create"} GroupUser
                    </div>
                </Modal.Header>
                <Modal.Body className="p-0">
                    <div className="building-level-edit-form">
                        <form className="form-background-color" onSubmit={handleSubmitForm}>
                            <div className="px-4 py-4 ">
                                <div className="row m-0">
                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="GroupUser id."
                                            className="w-100"
                                            value={groupUser?.id}
                                            id={'id'}
                                            disabled
                                        />
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Group</Form.Label>
                                        <Form.Select className=" " value={groups?.find((group) => group?.name == groupUser?.group)?.name} onChange={handleChange} name="group" id="group">
                                            <option value=""></option>
                                            {groups?.map((group) => (
                                                <option value={group?.name}>{group.name}</option>
                                            ))
                                            }
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors.group}
                                        </div>
                                    </div>


                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">User Email</Form.Label>
                                        <Form.Select className=" " value={users?.find((user) => user?.email == groupUser?.userEmail)?.email} onChange={handleChange} name="userEmail" id="userEmail">
                                            <option value=""></option>
                                            {users?.map((user) => (
                                                <option value={user?.email}>{user.email}</option>
                                            ))
                                            }
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors.userEmail}
                                        </div>
                                    </div>

                                    <div className="mb-3 col col-sm-6 p-0 ps-3">
                                        <Form.Label className="block text-gray-700 font-bold mb-2">Group Role</Form.Label>
                                        <Form.Select className=" " value={groupRoles?.find((role) => role == groupUser?.groupRole)} onChange={handleChange} name="groupRole" id="groupRole">
                                            <option value=""></option>
                                            {groupRoles?.map((group) => (
                                                <option value={group}>{group}</option>
                                            ))
                                            }
                                        </Form.Select>
                                        <div className="text-red-600">
                                            {errors.groupRole}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <Modal.Footer className="p-0 py-2">
                                <div className="d-flex justify-content-end gap-4 pe-3">
                                    <Button type="button" className="cancel-button-style px-4 py-2" onClick={clearForm}>Cancel</Button>
                                    <Button type="submit" className="button-style button-width px-4 py-2" disabled={isDisabled}>Save</Button>
                                </div>
                            </Modal.Footer>
                        </form>
                    </div>
                </Modal.Body >
            </Modal >
        </div >
    );
};

export default GroupUserForm;
