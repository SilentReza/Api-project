var pattern = /[^a-z]/;
var patnum = /\D/;
const userApp = new Vue({
    el: "#user",
    data: {
        // get value //
        userName: '',
        userEmail: '',
        userMobile: '',
        userCondition: '',
        allUsers: [],
        // errors //
        isCorect: true,
        errors: [],
        // edites //
        editeName: '',
        editeEmail: "",
        editeMobile: "",
    },
    methods: {
        getUsers() {
            // we have not have this in axios //
            var self = this;
            // get api content //
            axios.get('read.php')
                .then(function (response) {
                    self.allUsers = response['data']['data'];
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        addUsers() {
            // patterns and condition to addusers //
            this.isCorect = true;
            this.errors = [];
            var self = this;
            if (this.userName == "" || pattern.test(this.userName)) {
                this.isCorect = false
                this.errors.push("Please complete Name form")
            }
            if (this.userEmail == "") {
                this.isCorect = false
                this.errors.push("Please complete Email form")
            }
            if (this.userMobile == "" || patnum.test(this.userMobile)) {
                this.isCorect = false
                this.errors.push("Please complete Mobile form")
            }
            if (this.userName != "" && this.userMobile != "" && this.userEmail != "") {
                //add user//
                swal({
                    title: "Good job!",
                    text: "User added to table and server!",
                    icon: "success",
                    button: false,
                    timer: 3000,
                });
                axios.post('add_user.php', {
                    name: self.userName,
                    email: self.userEmail,
                    mobile: self.userMobile,
                    status: self.userCondition,
                })
                    .then(function (response) {
                        self.getUsers();
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                this.userName = "";
                this.userEmail = "";
                this.userMobile = "";
                this.userCondition = "";
            }
        },
        deleteUsers(id) {
            //delete user//
            var self = this;
            // to know user is sure or not//
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this user!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    // if sure we delete user//
                    if (willDelete) {
                        swal("Your User has been deleted!!", {
                            icon: "success",
                        });
                        // delete user//
                        axios.get('delete.php', {
                            params: {
                                userId: id,
                            }
                        })
                            .then(function (response) {
                                self.getUsers();
                                console.log(response)
                            })
                            .catch(function (error) {
                                console.log(error)
                            })
                    } else {
                        // if not sure wo do nothing //
                        swal("Your user is safe!");
                    }
                });
        },
        changeStatus(id, status) {
            //change status//
            var self = this;
            axios.get('change_status.php?user_id=' + id + "&status=" + status)
                .then(function (response) {
                    swal({
                        title: "OK!",
                        text: "condition of user is change!",
                        icon: "success",
                        button: false,
                        timer: 3000,
                    });
                    self.getUsers();
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        openEditetoggle(index) {
            // to open edit button//
            this.allUsers[index]['editMode'] = true;
        },
        editUser(id, index) {
            var self = this;
            axios.get('edit_user.php', {
                params: {
                    id: id,
                    name: self.editeName,
                    email: self.editeEmail,
                    mobile: self.editeMobile,
                }
            })
                .then(function (response) {
                    swal({
                        title: "Good!",
                        text: "we edit your user information!",
                        icon: "success",
                        button: false,
                        timer: 3000,
                    });
                    self.getUsers();
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })

            this.allUsers[index]['editMode'] = false;
        }
    },
})

userApp.getUsers();