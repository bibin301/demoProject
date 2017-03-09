
(function() {
  'use strict';

  angular
    .module(cartAppObj.id)
    .config(cartConfig);


  //////////////////////////  Router configuration /////////////////////////////////

  cartConfig.$inject = ['$stateProvider', '$urlRouterProvider', 'unsavedWarningsConfigProvider', 'CART_USER_ROLES'];

  function cartConfig($stateProvider, $urlRouterProvider, unsavedWarningsConfigProvider, CART_USER_ROLES) {

    console.log("CARTAPP.route.config: Started ...");

    //
    // Default landing page (For any unmatched url)
    $urlRouterProvider.otherwise("/home");

    $stateProvider
      .state('home', {
        url: "/home",
        templateUrl: "js/components/home/home.tpl.html",
        controller: 'CartHomeCtrl',
        ncyBreadcrumb: {
          skip: true
        },
        data: {
          authorisedRoles: []
        }
      })
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: "js/components/common/cartapp.tpl.html",
        ncyBreadcrumb: {
          label: 'Home page'
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      })
      .state('lock', {
        url: '/locked',
        templateUrl: "js/shared/login/locked.tpl.html",
        ncyBreadcrumb: {
          skip: true
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.mm_view, CART_USER_ROLES.mm_admin]
        }
      })
      .state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'js/components/dashboard/dashboard.tpl.html',
        ncyBreadcrumb: {
          label: 'Dashboard'
        },
        controller: "CartAppDashCtrl"
      })
      .state('app.mm', {
        url: "/mm",
        templateUrl: "js/components/mm/mm.tpl.html",
        ncyBreadcrumb: {
          label: "Meeting Minutes"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.mm_view, CART_USER_ROLES.mm_admin]
        }

      })
      .state('app.mm.list', {
        url: "/List",
        templateUrl: "js/components/mm/mm.List.tpl.html",
        controller: "mmListCtrl",
        ncyBreadcrumb: {
          label: "Meeting List"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.mm.actions', {
        url: "/Actions",
        templateUrl: "js/components/mm/mm.actions.tpl.html",
        controller: "mmActionCtrl",
        ncyBreadcrumb: {
          label: "My Actions"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.mm.admin', {
        url: "/admin",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
          label: "Admin"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.mm.admin.dept', {
        url: "/Department",
        templateUrl: "js/components/mm/mm.admin.department.tpl.html",
        controller: "mmAdminDeptCtrl",
        ncyBreadcrumb: {
          label: "Department(Admin)"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.mm.admin.extAtt', {
        url: "/ExternalAttendies",
        templateUrl: "js/components/mm/mm.admin.extAttendies.tpl.html",
        controller: "mmAdminExtAttCtrl",
        ncyBreadcrumb: {
          label: "External-Attendies(Admin)"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.mm.help', {
        url: "/help",
        templateUrl: "js/components/mm/mm.help.tpl.html",
        ncyBreadcrumb: {
          label: "Help"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      })
      // STO state for user management
      .state('app.um', {
        url: "/um",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
          label: "User Management"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.um.list', {
        url: "/list",
        templateUrl: "js/components/um/um.list.tpl.html",
        controller: 'umListCtrl',
        ncyBreadcrumb: {
          label: "List"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.um.help', {
        url: "/help",
        templateUrl: "js/components/um/um.help.tpl.html",
        ncyBreadcrumb: {
          label: "Help"
        },
        data: {}
      })

    // ENO state for user management
    //STO state for helpdesk
    .state('app.hdk', {
        url: "/hdk",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
          label: "HelpDesk"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.manage', {
        url: "/manageticket",
        controller: 'hdkManageCtrl',
        templateUrl: "js/components/hdk/hdk.manage-ticket-list.tpl.html",
        ncyBreadcrumb: {
          label: "Manage Ticket"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.manageticket', {
        url: "/manageticket/:tktId",
        controller: 'hdkTicketCtrl',
        templateUrl: "js/components/hdk/hdk.manage-ticket.tpl.html",
        ncyBreadcrumb: {
          label: "Edit Ticket"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.mytickets', {
        url: "/ticket/mytickets",
        controller: 'hdkMyTicketListCtrl',
        templateUrl: "js/components/hdk/hdk.my-ticket-list.tpl.html",
        ncyBreadcrumb: {
          label: "My Ticket"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.ticket', {
        url: "/myticket/:tktId",
        controller: 'hdkMyTicketCtrl',
        templateUrl: "js/components/hdk/hdk.my-ticket.tpl.html",
        ncyBreadcrumb: {
          label: "Edit MyTicket"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.admin.area', {
        url: "/area",
        controller: 'hdkAdminAreaCtrl',
        templateUrl: "js/components/hdk/hdk.area.tpl.html",
        ncyBreadcrumb: {
          label: "Area(Admin)"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.admin', {
        url: "/admin",
        template: '<div ui-view></div>',
        ncyBreadcrumb: {
          label: "Admin"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.admin.category', {
        url: "/category",
        controller: 'hdkAdminCategoryCtrl',
        templateUrl: "js/components/hdk/hdk.admin.category.tpl.html",
        ncyBreadcrumb: {
          label: "Category(Admin)"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }

      })
      .state('app.hdk.help', {
        url: "/help",
        templateUrl: "js/components/hdk/hdk.help.tpl.html",
        ncyBreadcrumb: {
          label: "Help"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      })
      /*ENO helpdesk*/
      /*STO tls*/
      .state('app.tls', {
        url: "/tls",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
          label: "TLS"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      })
      .state('app.tls.timelog', {
        url: "/timelog",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
          label: "Timelog"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      })
      .state('app.tls.timelog.submission', {
        url: "/timelog/submission",
        templateUrl: "js/components/tls/tls.timelog.submission.tpl.html",
        controller: 'tlsSubCtl',
        ncyBreadcrumb: {
          label: "Submission"
        },
        data: {}
      })
      .state('app.tls.timelog.approval', {
        url: "/timelog/approval",
        templateUrl: "js/components/tls/tls.timelog.approval.tpl.html",
        controller: 'approvalCtrl',
        ncyBreadcrumb: {
          label: "Approval"
        },
        data: {}
      })
      .state('app.tls.timelog.reports', {
        url: "/timelog/reports",
        templateUrl: "js/components/tls/tls.timelog.reports.tpl.html",
        controller: 'tlsReportsCtrl',
        ncyBreadcrumb: {
          label: "Reports"
        },
        data: {}
      })

    .state('app.tls.timelog.templates', {
        url: "/timelog/templates",
        templateUrl: "js/components/tls/tls.timelog.template.tpl.html",
        ncyBreadcrumb: {
          label: "Templates"
        },
        data: {}
      })
      .state('app.tls.timelog.help', {
        url: "/timelog/help",
        templateUrl: "js/components/tls/timelog_help.tpl.html",
        data: {}
      }).state('app.tls.admin', {
        url: "/admin",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
          label: "Admin"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      }).state('app.tls.project', {
        url: "/project",
        template: "<div ui-view></div>",
        ncyBreadcrumb: {
          label: "Project"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      }).state('app.tls.project.wri', {
        url: "/wri",
        templateUrl: "js/components/tls/tls.wri.list.tpl.html",
        controller: 'wriListCtl',
        ncyBreadcrumb: {
          label: "Wri"
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      })
      .state('app.tls.project.wbs', {
        url: '/Wbs',
        templateUrl: "js/components/tls/tls.wbs.list.tpl.html",
        controller: 'wbsListCtl',
        ncyBreadcrumb: {
          skip: true
        },
        data: {
          authorisedRoles: [CART_USER_ROLES.logged_in]
        }
      })
      .state('app.tls.project.approver', {
        url: '/change approver',
        templateUrl: "js/components/tls/tls.changeApprover.tpl.html",
        controller: 'changeApproverCtrl',
        ncyBreadcrumb: {
          skip: true
        },
        data: {

        }
      });


    /*eno tls*/


    console.log("CARTAPP.route.config: Completed");
  }

  ////////////////END OF  Router configuration /////////////////////////////////

})();
