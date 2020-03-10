import { observable, action } from "mobx"
import { StoreModule } from "@/utils/mobx-store"

class ModuleTest extends StoreModule {
    @observable
    flog = true

    @action
    toggle = () => {
        this.setState({ flog: !this.flog })
    }
}

export default ModuleTest
