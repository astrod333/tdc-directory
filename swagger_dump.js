
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Tanzania Developer Community API",
      "version": "1.0.0",
      "description": "Backend API for Tanzania Developer Community with GitHub SSO, rankings, and social features",
      "contact": {
        "name": "API Support",
        "email": "support@tzdevcommunity.com"
      }
    },
    "servers": [
      {
        "url": "/",
        "description": "Development server"
      }
    ],
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "description": "Enter your JWT token in the format: Bearer {token}"
        }
      },
      "schemas": {
        "User": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "username": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "githubUsername": {
              "type": "string"
            },
            "githubData": {
              "type": "object"
            },
            "stats": {
              "type": "object"
            },
            "role": {
              "type": "string",
              "enum": [
                "user",
                "moderator",
                "admin"
              ]
            }
          }
        },
        "Post": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "author": {
              "type": "object"
            },
            "type": {
              "type": "string",
              "enum": [
                "timeline",
                "flex",
                "idea",
                "project"
              ]
            },
            "title": {
              "type": "string"
            },
            "content": {
              "type": "string"
            },
            "tags": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "likes": {
              "type": "array"
            },
            "comments": {
              "type": "array"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "Activity": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string"
            },
            "user": {
              "type": "string"
            },
            "type": {
              "type": "string"
            },
            "repository": {
              "type": "object"
            },
            "details": {
              "type": "object"
            },
            "activityDate": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "Error": {
          "type": "object",
          "properties": {
            "success": {
              "type": "boolean",
              "example": false
            },
            "message": {
              "type": "string"
            }
          }
        }
      }
    },
    "tags": [
      {
        "name": "Authentication",
        "description": "User authentication and GitHub OAuth endpoints"
      },
      {
        "name": "Users",
        "description": "User profiles, rankings, and GitHub data"
      },
      {
        "name": "Posts",
        "description": "Social posts, timelines, and community feed"
      },
      {
        "name": "Admin",
        "description": "Admin and moderation endpoints"
      }
    ],
    "paths": {
      "/api/admin/stats": {
        "get": {
          "summary": "Get dashboard statistics",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Dashboard stats"
            }
          }
        }
      },
      "/api/admin/users": {
        "get": {
          "summary": "Get all users (admin view)",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "search",
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "role",
              "schema": {
                "type": "string",
                "enum": [
                  "user",
                  "moderator",
                  "admin"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of users"
            }
          }
        }
      },
      "/api/admin/users/{id}/role": {
        "put": {
          "summary": "Update user role",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "role"
                  ],
                  "properties": {
                    "role": {
                      "type": "string",
                      "enum": [
                        "user",
                        "moderator",
                        "admin"
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Role updated"
            }
          }
        }
      },
      "/api/admin/users/{id}/status": {
        "put": {
          "summary": "Activate/Deactivate user",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Status toggled"
            }
          }
        }
      },
      "/api/admin/users/{id}": {
        "delete": {
          "summary": "Delete user",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User deleted"
            }
          }
        }
      },
      "/api/admin/posts": {
        "get": {
          "summary": "Get all posts for moderation",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "moderated",
              "schema": {
                "type": "boolean"
              }
            },
            {
              "in": "query",
              "name": "search",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of posts"
            }
          }
        }
      },
      "/api/admin/posts/{id}/moderate": {
        "put": {
          "summary": "Moderate post",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "isModerated"
                  ],
                  "properties": {
                    "isModerated": {
                      "type": "boolean"
                    },
                    "moderationReason": {
                      "type": "string"
                    },
                    "isPublished": {
                      "type": "boolean"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Post moderated"
            }
          }
        }
      },
      "/api/admin/posts/{id}/pin": {
        "put": {
          "summary": "Pin/Unpin post",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Pin status toggled"
            }
          }
        }
      },
      "/api/admin/posts/{id}": {
        "delete": {
          "summary": "Delete post",
          "tags": [
            "Admin"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Post deleted"
            }
          }
        }
      },
      "/api/auth/github": {
        "get": {
          "summary": "Get GitHub OAuth URL",
          "tags": [
            "Authentication"
          ],
          "responses": {
            "200": {
              "description": "GitHub auth URL returned"
            }
          }
        }
      },
      "/api/auth/github/callback": {
        "get": {
          "summary": "GitHub OAuth callback",
          "tags": [
            "Authentication"
          ],
          "parameters": [
            {
              "in": "query",
              "name": "code",
              "schema": {
                "type": "string"
              },
              "required": true,
              "description": "GitHub OAuth code"
            }
          ],
          "responses": {
            "302": {
              "description": "Redirect to frontend with token"
            }
          }
        }
      },
      "/api/auth/me": {
        "get": {
          "summary": "Get current user",
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Current user data"
            }
          }
        }
      },
      "/api/auth/logout": {
        "post": {
          "summary": "Logout user",
          "tags": [
            "Authentication"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Logged out successfully"
            }
          }
        }
      },
      "/api/auth/admin/login": {
        "post": {
          "summary": "Admin login with email and password",
          "tags": [
            "Authentication"
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "email",
                    "password"
                  ],
                  "properties": {
                    "email": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successful"
            }
          }
        }
      },
      "/api/posts": {
        "get": {
          "summary": "Get all posts (feed)",
          "tags": [
            "Posts"
          ],
          "parameters": [
            {
              "in": "query",
              "name": "type",
              "schema": {
                "type": "string",
                "enum": [
                  "timeline",
                  "flex",
                  "idea",
                  "project"
                ]
              }
            },
            {
              "in": "query",
              "name": "tag",
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "sortBy",
              "schema": {
                "type": "string",
                "enum": [
                  "recent",
                  "popular",
                  "pinned"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "List of posts"
            }
          }
        },
        "post": {
          "summary": "Create a new post",
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "type",
                    "title",
                    "content"
                  ],
                  "properties": {
                    "type": {
                      "type": "string",
                      "enum": [
                        "timeline",
                        "flex",
                        "idea",
                        "project"
                      ]
                    },
                    "title": {
                      "type": "string"
                    },
                    "content": {
                      "type": "string"
                    },
                    "tags": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "projectData": {
                      "type": "object"
                    },
                    "codeSnippet": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Post created"
            }
          }
        }
      },
      "/api/posts/user/{username}": {
        "get": {
          "summary": "Get user's posts",
          "tags": [
            "Posts"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "username",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User's posts"
            }
          }
        }
      },
      "/api/posts/{id}": {
        "get": {
          "summary": "Get single post",
          "tags": [
            "Posts"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Post data"
            }
          }
        },
        "put": {
          "summary": "Update post",
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Post updated"
            }
          }
        },
        "delete": {
          "summary": "Delete post",
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Post deleted"
            }
          }
        }
      },
      "/api/posts/{id}/like": {
        "post": {
          "summary": "Like/Unlike post",
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Like status updated"
            }
          }
        }
      },
      "/api/posts/{id}/comments": {
        "post": {
          "summary": "Add comment to post",
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "content"
                  ],
                  "properties": {
                    "content": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Comment added"
            }
          }
        }
      },
      "/api/posts/{id}/comments/{commentId}": {
        "delete": {
          "summary": "Delete comment",
          "tags": [
            "Posts"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "path",
              "name": "commentId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Comment deleted"
            }
          }
        }
      },
      "/api/users": {
        "get": {
          "summary": "Get all users with ranking",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer"
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              },
              "description": "Results per page"
            },
            {
              "in": "query",
              "name": "sortBy",
              "schema": {
                "type": "string",
                "enum": [
                  "contributionScore",
                  "commits",
                  "stars",
                  "repos"
                ]
              },
              "description": "Sort field"
            },
            {
              "in": "query",
              "name": "filter",
              "schema": {
                "type": "string",
                "enum": [
                  "active",
                  "availableForProjects"
                ]
              },
              "description": "Filter users"
            }
          ],
          "responses": {
            "200": {
              "description": "List of users"
            }
          }
        }
      },
      "/api/users/leaderboard": {
        "get": {
          "summary": "Get leaderboard",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              },
              "description": "Number of users"
            },
            {
              "in": "query",
              "name": "type",
              "schema": {
                "type": "string",
                "enum": [
                  "overall",
                  "commits",
                  "pullRequests",
                  "stars"
                ]
              },
              "description": "Leaderboard type"
            }
          ],
          "responses": {
            "200": {
              "description": "Leaderboard data"
            }
          }
        }
      },
      "/api/users/profile": {
        "put": {
          "summary": "Update user profile",
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "bio": {
                      "type": "string"
                    },
                    "website": {
                      "type": "string"
                    },
                    "skills": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      }
                    },
                    "showAsAvailableForProjects": {
                      "type": "boolean"
                    },
                    "social": {
                      "type": "object"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Profile updated"
            }
          }
        }
      },
      "/api/users/sync": {
        "post": {
          "summary": "Sync GitHub data manually",
          "tags": [
            "Users"
          ],
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Sync initiated"
            }
          }
        }
      },
      "/api/users/{username}": {
        "get": {
          "summary": "Get user profile by username",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "username",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Username or GitHub username"
            }
          ],
          "responses": {
            "200": {
              "description": "User profile data"
            }
          }
        }
      },
      "/api/users/{username}/repositories": {
        "get": {
          "summary": "Get user repositories",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "username",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "sortBy",
              "schema": {
                "type": "string",
                "enum": [
                  "updated",
                  "stars",
                  "forks"
                ]
              }
            },
            {
              "in": "query",
              "name": "language",
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User repositories"
            }
          }
        }
      },
      "/api/users/{username}/activities": {
        "get": {
          "summary": "Get user activities",
          "tags": [
            "Users"
          ],
          "parameters": [
            {
              "in": "path",
              "name": "username",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "type",
              "schema": {
                "type": "string",
                "enum": [
                  "commit",
                  "pull_request",
                  "issue",
                  "star",
                  "fork"
                ]
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer"
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "User activities"
            }
          }
        }
      }
    }
  },
  "customOptions": {
    "persistAuthorization": true
  }
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
