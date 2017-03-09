/* Cartwheel App creation:
 *  This defines the Angular application which defines the dependent modules.
 *  This app depends on the following:
 *  -
 * Dependencies: This needs to be called after angular.js is included and first
 *               js of the cartwheel specific js code
 *               jquery.js
 *               angular.js
 *               cartwheel_app.js
 */

/* Home controller : index.html */

(function () {
    'use strict';

    angular.module(cartAppObj.id)
            .controller('LoginCtrl', LoginCtrl);


    //////////////////////////  login controller /////////////////////////////////
    /*
     * This section provides the services for login functionlity.
     * - Connects the view (login.modal.tpl.html) to the service (CartAuthServ)
     * - Functionality to manage the UI: closeDialog
     */

    LoginCtrl.$inject = ['$rootScope', '$scope', '$modalInstance', '$window', '$location', 'CartAuthSrv'];
    function LoginCtrl($rootScope, $scope, $modalInstance, $window, $location, CartAuthSrv) {


        $scope.loginModel = {};

        $scope.loginModel.msgText = '';
        $scope.loginModel.invalid = false;
        $scope.loginModel.userData = {};
        $scope.loginModel.userData.un = '';
        $scope.loginModel.userData.pw = '';
        $scope.loginModel.userData.tkn = '';
        $scope.loginModel.newLogin;
        $scope.loginModel.cartLogin = cartLogin;
        $scope.loginModel.loginSuccess = loginSuccess;
        $scope.loginModel.loginFailed = loginFailed;
        $scope.loginModel.cartTimeoutLogin = cartTimeoutLogin;
        $scope.loginModel.reloginSuccess = reloginSuccess;
        $scope.loginModel.closeModalDialog = closeModalDialog;
        $scope.loginModel.userLogin =userLogin;//my function


        function userLogin(user,path){

            console.log("my login " , user)


            if(user.un==='user' && user.pw==='1234'){
                 path = typeof path !== 'undefined' ? path : "/app/dashboard";
            $scope.loginModel.closeModalDialog();
            $location.path(path);

                
            }else {

                alert("failed");
            }




        }

        function cartLogin(userData) {
            var key = "this is a 24 byte key !!";
            //var message = userData.pw;
            //var ciphertext = des(key, message, 1, 0);
            var ciphertext = des(key, userData.pw, 1, 0);
            userData.pw = stringToHex(ciphertext);
            console.log(userData.pw);

            //userData.pw  = Base64.encode(userData.pw)
            userData.tkn = '';
            CartAuthSrv.login(userData, $scope.loginModel.loginSuccess, $scope.loginModel.loginFailed);
        }

        function loginSuccess(userData, path) {
            // path = typeof path !== 'undefined' ? path : "/app/dashboard";
            // $scope.loginModel.closeModalDialog();
            // $location.path(path);
        }

        function loginFailed() {
            console.log("Invalid username and/or password");
            $scope.loginModel.invalid = true;
            $scope.loginModel.msgText = "Invalid username and/or password";
        }

        function reloginSuccess(userData) {
            $scope.loginModel.closeModalDialog();
        }

        function cartTimeoutLogin(userData) {
            userData.token = '';
            CartAuthSrv.loginCart(userData,
                    $scope.loginModel.reloginSuccess(userData),
                    $scope.loginModel.loginFailed);
        }


        function closeModalDialog() {
            $scope.loginModel.userData.username = "";
            $scope.loginModel.userData.password = "";
            $scope.loginModel.invalid = false;
            $rootScope.coreModel.modal.loginModal = false;
            $modalInstance.dismiss('cancel');
        }

        var Base64 = {
            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
                var i = 0;

                input = Base64._utf8_encode(input);

                while (i < input.length) {

                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output + this._keyStr.charAt(enc1) +
                            this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3)
                            + this._keyStr.charAt(enc4);

                }

                return output;
            },
            _utf8_encode: function (string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0;n < string.length;n++) {

                    var c = string.charCodeAt(n);

                    if (c < 128) {
                        utftext += String.fromCharCode(c);
                    } else if ((c > 127) && (c < 2048)) {
                        utftext += String.fromCharCode((c >> 6) | 192);
                        utftext += String.fromCharCode((c & 63) | 128);
                    } else {
                        utftext += String.fromCharCode((c >> 12) | 224);
                        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                        utftext += String.fromCharCode((c & 63) | 128);
                    }

                }

                return utftext;
            },
        }

    }
})();
