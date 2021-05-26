const url = "https://vue3-course-api.hexschool.io/"
const path = "linvueportfolio";
const app = {
    data() {
        return {
            products: [],
            editingProduct: {
                data: {
                    "category": "",
                    "content": "",
                    "description": "",
                    "id": "",
                    "is_enabled": 1,
                    "origin_price": 0,
                    "price": 0,
                    "title": "",
                    "unit": "個",
                    "num": 0,
                    "imageUrl": "",
                    "imagesUrl": []
                }
            }
        }
    },
    methods: {
        getProducts() {
            axios.get(`${url}api/${path}/admin/products?page=:page`)
                .then(res => {
                    console.log(res);
                    this.products = res.data.products;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        editProduct(item) {
            this.editingProduct = {
                data: { ...item }
            };
        },
        updateProduct() {
            if (this.editingProduct.data.id !== '') {
                this.products.forEach(item => {
                    if (item.id === this.editingProduct.data.id) {
                        axios.put(`${url}api/${path}/admin/product/${item.id}`, this.editingProduct)
                            .then(res => {
                                console.log(res);
                                if (res.data.success) {
                                    console.log("更新成功");
                                    this.getProducts();
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                });
            } else {
                const dateTime = Date.now();
                const timestamp = Math.floor(dateTime / 1000);
                this.editingProduct.id = timestamp;
                axios.post(`${url}api/${path}/admin/product`, this.editingProduct)
                    .then(res => {
                        console.log(res);
                        if (res.data.success) {
                            console.log("新增成功");
                            this.getProducts();
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            this.editingProduct = {
                data: {
                    "category": "",
                    "content": "",
                    "description": "",
                    "id": "",
                    "is_enabled": 1,
                    "origin_price": 0,
                    "price": 0,
                    "title": "",
                    "unit": "個",
                    "num": 0,
                    "imageUrl": "",
                    "imagesUrl": []
                }
            }
        },
        cancelEdit() {
            this.editingProduct = {
                data: {
                    "category": "",
                    "content": "",
                    "description": "",
                    "id": "",
                    "is_enabled": 1,
                    "origin_price": 0,
                    "price": 0,
                    "title": "",
                    "unit": "個",
                    "num": 0,
                    "imageUrl": "",
                    "imagesUrl": []
                }
            };
        },
        delProduct(id) {
            axios.delete(`${url}api/${path}/admin/product/${id}`)
                .then(res => {
                    console.log(res);
                    if (res.data.success) {
                        console.log('刪除成功');
                        this.getProducts();
                    } else {
                        console.log(res.data.message);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },
        checkLogin() {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${url}api/user/check`)
                .then(res => {
                    // console.log(res);
                    if (res.data.success) {
                        // window.location.href = 'index.html';
                    } else {
                        window.location.href = 'login.html';
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created() {
        this.checkLogin();
        this.getProducts();
    },
}

Vue.createApp(app).mount('#app');