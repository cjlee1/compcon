<template>
  <v-col cols="3">
    <v-dialog v-model="dialog" width="70vw">
      <template v-slot:activator="{ on }">
        <v-btn large outlined :color="`reserve--organization`" block v-on="on">
          <v-icon small left :color="`reserve--organization`">cci-barrage</v-icon>
          {{ org.Name }}
        </v-btn>
      </template>
      <cc-titled-panel
        :title="org.Name"
        icon="cci-barrage"
        color="reserve--organization"
        style="height: 100%"
      >
        <div slot="items">
          <cc-tooltip simple inline content="Delete Organization">
            <v-btn icon color="error" @click="remove()">
              <v-icon>delete</v-icon>
            </v-btn>
          </cc-tooltip>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <v-row>
          <v-col cols="6">
            <v-text-field v-model="org.Name" label="Organization Name" outlined hide-details />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="org.Purpose" label="Organization Type" outlined hide-details />
          </v-col>
        </v-row>
        <v-textarea
          v-model="org.Description"
          label="Purpose, goal, and orginaztion details"
          auto-grow
          rows="2"
          filled
          hide-details
        />
        <br />
        <v-row dense justify="center" class="mx-4">
          <v-col class="text-center">
            <div>
              <span class="heading h2 accent--text">+ {{ org.Efficiency }}</span>
              <br />
              <span>
                Organization Efficiency
                <cc-tooltip
                  simple
                  inline
                  content="How directly effective your organization is at what it does (a military
                organization with high efficiency would be good at combat, for example).
                <br />Efficiency can be used to perform activities related to your organization’s
                purpose (science, military, etc). You can use these advantages as
                <strong>reserves.</strong>"
                >
                  <v-icon small right>mdi-help-circle-outline</v-icon>
                </cc-tooltip>
              </span>
            </div>
          </v-col>
          <v-divider vertical class="mx-5" />
          <v-col class="text-center">
            <div>
              <span class="heading h2 accent--text">+ {{ org.Influence }}</span>
              <br />
              <span>
                Organization Influence
                <cc-tooltip
                  simple
                  inline
                  content="Influence is your organization’s size, reach, wealth, and reputation.
                Influence be used to acquire assets, create opportunities, or sway public
                opinion."
                >
                  <v-icon small right>mdi-help-circle-outline</v-icon>
                </cc-tooltip>
              </span>
            </div>
          </v-col>
        </v-row>
        <br />
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="dialog = false">Dismiss</v-btn>
        </v-card-actions>
      </cc-titled-panel>
    </v-dialog>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'cc-org-item',
  props: {
    org: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    dialog: false,
  }),
  methods: {
    remove() {
      this.$emit('remove')
      this.dialog = false
    },
  },
})
</script>
